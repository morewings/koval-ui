import type {ChangeEvent} from 'react';
import {forwardRef, useState, useCallback} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import {Validation, defaultValidator} from '@/internal/inputs';
import type {NativePropsInteractive, CallbackPropsInteractive} from '@/internal/inputs';
import {IconError, IconLoader, IconValid} from '@/lib/Icons';
import {useInternalId} from '@/internal/hooks/useInternalId.ts';

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
            id: idProp,
            label,
            validatorFn = defaultValidator,
            required,
            ...nativeProps
        },
        ref
    ) => {
        const hasCustomValidation = validatorFn !== defaultValidator;
        const [customValidation, setCustomValidation] = useState(hasCustomValidation);
        const id = useInternalId(idProp);
        const [validity, setValidity] = useState<keyof typeof Validation | null>(null);
        const ValidationIcon = {
            [Validation.error]: IconError,
            [Validation.valid]: IconValid,
            [Validation.inProgress]: IconLoader,
        }[validity!];
        const handleChange = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                const isValid = event.target.reportValidity();
                !isValid && setCustomValidation(true);
                const validState = customValidation ? Validation.valid : null;
                const nextValidationState = isValid ? validState : Validation.error;
                setValidity(nextValidationState);
                onChange(event);
            },
            [setValidity, onChange, customValidation, setCustomValidation]
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
