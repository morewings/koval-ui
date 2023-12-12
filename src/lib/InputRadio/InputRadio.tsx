import type {ChangeEvent} from 'react';
import {forwardRef, useState, useCallback} from 'react';
import classNames from 'classnames';

import type {NativePropsInteractive, CallbackPropsInteractive} from '@/internal/inputs';
import {Validation} from '@/internal/inputs';
import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import {useInternalId} from '@/internal/hooks/useInternalId.ts';

import classes from './InputRadio.module.css';

export type Props = DataAttributes &
    LibraryProps &
    NativePropsInteractive &
    CallbackPropsInteractive & {
        validatorFn?: (value: CallbackPropsInteractive['checked']) => string | true;
        label?: string;
    };

export const InputRadio = forwardRef<HTMLInputElement, Props>(
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
            validatorFn = () => true,
            required,
            ...nativeProps
        },
        ref
    ) => {
        const id = useInternalId(idProp);
        const [_, setValidity] = useState<keyof typeof Validation | null>(null);
        const handleChange = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                const nextValidationState = event.target.checkValidity() ? Validation.valid : Validation.error;
                setValidity(nextValidationState);
                onChange(event);
            },
            [setValidity, onChange]
        );
        // TODO: needs useFirstRender probably, doesn't validate by default
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
                    type="radio"
                    id={id}
                    value={value}
                    checked={checked}
                    defaultChecked={defaultChecked}
                    onChange={handleChange}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onKeyUp={onKeyUp}
                    onKeyDown={onKeyDown}
                    required={required}
                    onInput={handleInput}
                />
                <label className={classes.label} htmlFor={id}>
                    {label} {required && <span className={classes.required}>*</span>}
                </label>
            </div>
        );
    }
);

InputRadio.displayName = 'InputRadio';
