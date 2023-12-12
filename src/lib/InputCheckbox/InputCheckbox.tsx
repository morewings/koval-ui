import type {ChangeEvent} from 'react';
import {forwardRef, useState, useCallback} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import {Validation} from '@/internal/inputs';
import type {NativePropsInteractive, CallbackPropsInteractive} from '@/internal/inputs';
import {IconError, IconLoader, IconValid} from '@/lib/Icons';

import classes from './InputCheckbox.module.css';

type Props = DataAttributes &
    LibraryProps &
    NativePropsInteractive &
    CallbackPropsInteractive & {
        validatorFn?: (value: CallbackPropsInteractive['checked']) => string | true;
        label?: string;
    };

export const InputCheckbox = forwardRef<HTMLInputElement, Props>(
    (
        {
            className,
            disabled,
            value,
            onChange = () => {},
            onFocus = () => {},
            onBlur = () => {},
            onKeyDown = () => {},
            onKeyUp = () => {},
            checked,
            defaultChecked,
            id,
            label,
            validatorFn = () => true,
            required,
            ...nativeProps
        },
        ref
    ) => {
        const [validity, setValidity] = useState<keyof typeof Validation | null>(null);
        const ValidationIcon = {
            [Validation.error]: IconError,
            [Validation.valid]: IconValid,
            [Validation.inProgress]: IconLoader,
        }[validity!];
        const handleChange = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                const nextValidationState = event.target.reportValidity() ? Validation.valid : Validation.error;
                setValidity(nextValidationState);
                onChange(event);
            },
            [setValidity, onChange]
        );
        const handleInput = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                const validationResult = validatorFn(event.target.checked);
                if (typeof validationResult === 'string') {
                    event.target.setCustomValidity(validationResult);
                } else {
                    event.target.setCustomValidity('');
                }
            },
            [validatorFn]
        );
        return (
            <div className={classNames(classes.wrapper, className)}>
                <input
                    {...nativeProps}
                    className={classes.input}
                    ref={ref}
                    disabled={disabled}
                    type="checkbox"
                    id={id}
                    value={value}
                    checked={checked}
                    defaultChecked={defaultChecked}
                    onChange={handleChange}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onKeyUp={onKeyUp}
                    onKeyDown={onKeyDown}
                    onInput={handleInput}
                    required={required}
                />
                <label className={classes.label} htmlFor={id}>
                    {label} {required && <span className={classes.required}>*</span>}
                </label>
                {validity && <ValidationIcon className={classes.icon} />}
            </div>
        );
    }
);

InputCheckbox.displayName = 'InputRadio';
