import type {ChangeEvent, KeyboardEvent} from 'react';
import {forwardRef, useCallback} from 'react';
import classNames from 'classnames';

import {IconError, IconValid, IconLoader, IconClock} from '@/internal/Icons';
import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import type {NativePropsTextual, CallbackPropsTextual, ValidationProps} from '@/internal/inputs';
import {ValidationState, defaultValidator, useValidation} from '@/internal/inputs';
import {useInternalRef} from '@/internal/hooks/useInternalRef.ts';

import classes from './InputTime.module.css';

export type Props = DataAttributes &
    LibraryProps &
    Omit<NativePropsTextual, 'maxLength' | 'minLength' | 'autoComplete' | 'inputMode'> &
    Omit<CallbackPropsTextual, 'onChange'> &
    ValidationProps & {
        onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
        min?: string;
        max?: string;
    };

export const InputTime = forwardRef<HTMLInputElement, Props>(
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
            ...nativeProps
        },
        ref
    ) => {
        const inputRef = useInternalRef(ref);
        const {validity, setValidity, validateTextual} = useValidation({validatorFn});
        const ValidationIcon = {
            [ValidationState.error]: IconError,
            [ValidationState.valid]: IconValid,
            [ValidationState.inProgress]: IconLoader,
        }[validity!];

        const handleInvalid = useCallback(() => {
            setValidity(ValidationState.error);
        }, [setValidity]);

        const handleIconClick = useCallback(() => {
            inputRef.current?.focus();
            inputRef.current?.showPicker();
        }, [inputRef]);

        const handleKeyDown = useCallback(
            (event: KeyboardEvent<HTMLInputElement>) => {
                onKeyDown(event);
            },
            [onKeyDown]
        );

        const handleKeyUp = useCallback(
            (event: KeyboardEvent<HTMLInputElement>) => {
                onKeyUp(event);
            },
            [onKeyUp]
        );

        const handleChange = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                const isValid = event.target.checkValidity();
                isValid && setValidity(ValidationState.valid);
                onChange(event);
            },
            [onChange, setValidity]
        );

        return (
            <div className={classNames(classes['input-time'], className)}>
                <IconClock tabIndex={-1} onClick={handleIconClick} className={classes.icon} />
                <input
                    {...nativeProps}
                    type="time"
                    placeholder={placeholder}
                    className={classes.input}
                    ref={inputRef}
                    disabled={disabled}
                    value={value}
                    defaultValue={defaultValue}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onKeyUp={handleKeyUp}
                    onKeyDown={handleKeyDown}
                    onInvalid={handleInvalid}
                    onChange={handleChange}
                    onInput={validateTextual}
                />
                {validity && <ValidationIcon />}
            </div>
        );
    }
);

InputTime.displayName = 'InputTime';
