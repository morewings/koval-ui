import type {ChangeEvent, InputHTMLAttributes, FormEvent} from 'react';
import {useMemo} from 'react';
import {forwardRef, useCallback} from 'react';
import classNames from 'classnames';
import {useLocalTheme} from 'css-vars-hook';

import {IconError, IconValid, IconLoader, IconArrowUp, IconArrowDown} from '@/internal/Icons';
import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import type {NativePropsNumeric, CallbackPropsTextual, ValidationProps} from '@/internal/inputs';
import {ValidationState, defaultValidator, useValidation} from '@/internal/inputs';
import {useInternalRef} from '@/internal/hooks/useInternalRef.ts';

import classes from './InputNumber.module.css';

export type Props = DataAttributes &
    LibraryProps &
    NativePropsNumeric &
    CallbackPropsTextual &
    ValidationProps & {
        /**
         * Define the width of the input in characters
         */
        size?: InputHTMLAttributes<HTMLInputElement>['size'];
    };

const ChangeEventSpinner = new Event('change', {bubbles: true});

export const InputNumber = forwardRef<HTMLInputElement, Props>(
    (
        {
            className,
            placeholder = '',
            disabled,
            value,
            onChange = () => {},
            onFocus = () => {},
            onBlur = () => {},
            onKeyDown = () => {},
            onKeyUp = () => {},
            defaultValue,
            validatorFn = defaultValidator,
            size = 10,
            step = 1,
            ...nativeProps
        },
        ref
    ) => {
        const {validateTextual, validity, setValidity} = useValidation({validatorFn});
        const ValidationIcon = {
            [ValidationState.error]: IconError,
            [ValidationState.valid]: IconValid,
            [ValidationState.inProgress]: IconLoader,
        }[validity!];
        const handleChange = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                onChange(event);
            },
            [onChange]
        );

        const handleInvalid = useCallback(() => {
            setValidity(ValidationState.error);
        }, [setValidity]);

        const inputRef = useInternalRef(ref);

        const handleDecrement = useCallback(() => {
            inputRef.current!.stepDown();
            inputRef.current!.dispatchEvent(ChangeEventSpinner);
            validateTextual(ChangeEventSpinner as unknown as FormEvent);
        }, [inputRef, validateTextual]);

        const handleIncrement = useCallback(() => {
            inputRef.current!.stepUp();
            inputRef.current!.dispatchEvent(ChangeEventSpinner);
            validateTextual(ChangeEventSpinner as unknown as FormEvent);
        }, [inputRef, validateTextual]);

        const {LocalRoot} = useLocalTheme();
        const theme = useMemo(() => ({size}), [size]);

        return (
            <LocalRoot className={classNames(classes.wrapper, className)} theme={theme}>
                <div className={classes.spinner}>
                    <IconArrowUp tabIndex={-1} onClick={handleIncrement} />
                    <IconArrowDown tabIndex={-1} onClick={handleDecrement} />
                </div>
                <input
                    {...nativeProps}
                    step={step}
                    size={size}
                    type="number"
                    placeholder={placeholder}
                    className={classes.input}
                    ref={inputRef}
                    disabled={disabled}
                    value={value}
                    defaultValue={defaultValue}
                    onChange={handleChange}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onKeyUp={onKeyUp}
                    onKeyDown={onKeyDown}
                    onInvalid={handleInvalid}
                    onInput={validateTextual}
                />
                {validity && <ValidationIcon className={classes.validation} />}
            </LocalRoot>
        );
    }
);

InputNumber.displayName = 'InputNumber';
