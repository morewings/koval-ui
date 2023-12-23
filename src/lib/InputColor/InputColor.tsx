import type {ChangeEvent, FocusEvent} from 'react';
import {useMemo, useRef} from 'react';
import {forwardRef, useCallback} from 'react';
import classNames from 'classnames';
import {useLocalTheme} from 'css-vars-hook';

import {IconError, IconValid, IconLoader, IconPalette} from '@/internal/Icons';
import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import type {NativePropsTextual, CallbackPropsTextual, ValidationProps} from '@/internal/inputs';
import {defaultValidator} from '@/internal/inputs';
import {ValidationState, useValidation} from '@/internal/inputs';
import {useInternalId} from '@/internal/hooks/useInternalId.ts';

import classes from './InputColor.module.css';
import {invertColor} from './invertColor.ts';

export type Props = DataAttributes &
    LibraryProps &
    Omit<NativePropsTextual, 'maxLength' | 'minLength' | 'autoComplete' | 'inputMode'> &
    CallbackPropsTextual &
    ValidationProps & {min?: string; max?: string};

export const InputColor = forwardRef<HTMLInputElement, Props>(
    (
        {
            className,
            placeholder = '#000000',
            disabled,
            value,
            onChange = () => {},
            onFocus = () => {},
            onBlur = () => {},
            onKeyDown = () => {},
            onKeyUp = () => {},
            defaultValue,
            validatorFn = defaultValidator,
            id: idProp,
            ...nativeProps
        },
        ref
    ) => {
        const id = useInternalId(idProp);
        const {validateTextual, validity, setValidity} = useValidation({validatorFn});
        const ValidationIcon = {
            [ValidationState.error]: IconError,
            [ValidationState.valid]: IconValid,
            [ValidationState.inProgress]: IconLoader,
        }[validity!];

        const {LocalRoot, setTheme} = useLocalTheme();
        const displayValue = (value ?? defaultValue ?? '') as string;
        const theme = useMemo(
            () => ({
                selectedColor: displayValue,
                invertedColor: invertColor(displayValue, true),
            }),
            [displayValue]
        );

        /* onChange callback makes color picker to lose focus. It triggered in onBlur instead. */

        const handleInvalid = useCallback(() => {
            setValidity(ValidationState.error);
        }, [setValidity]);

        const handleFocus = useCallback(
            (event: FocusEvent<HTMLInputElement>) => {
                onFocus(event);
                setTheme({
                    selectedColor: event.target.value,
                    invertedColor: invertColor(event.target.value, true),
                });
            },
            [onFocus, setTheme]
        );

        const handleBlur = useCallback(
            (event: FocusEvent<HTMLInputElement>) => {
                setTheme({
                    selectedColor: event.target.value,
                    invertedColor: invertColor(event.target.value, true),
                });
                onBlur(event);
                onChange(event);
            },
            [onBlur, onChange, setTheme]
        );

        const handleInput = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                validateTextual(event);
            },
            [validateTextual]
        );

        const labelRef = useRef<HTMLLabelElement>(null);

        const handleChange = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                setTheme({
                    selectedColor: event.target.value,
                    invertedColor: invertColor(event.target.value, true),
                });
                if (labelRef?.current) {
                    labelRef.current.innerText = event.target.value;
                }
            },
            [setTheme]
        );

        return (
            <LocalRoot theme={theme} className={classNames(classes['input-color'], className)}>
                <div className={classes.toggle}>
                    <input
                        {...nativeProps}
                        id={id}
                        ref={ref}
                        type="color"
                        disabled={disabled}
                        value={value}
                        defaultValue={defaultValue}
                        className={classes['input-alt']}
                        onInvalid={handleInvalid}
                        onInput={handleInput}
                        onBlur={handleBlur}
                        onKeyUp={onKeyUp}
                        onKeyDown={onKeyDown}
                        onFocus={handleFocus}
                        onChange={handleChange}
                    />
                    <IconPalette className={classNames(classes.icon)} />
                </div>
                <label htmlFor={id} className={classNames(classes['input-display'])} ref={labelRef}>
                    {displayValue || placeholder}
                </label>
                {validity && <ValidationIcon className={classes.validity} />}
            </LocalRoot>
        );
    }
);

InputColor.displayName = 'InputColor';
