import type {ChangeEvent} from 'react';
import {forwardRef, useState, useCallback} from 'react';
import classNames from 'classnames';

import type {NativePropsInteractive, CallbackPropsInteractive} from '@/internal/inputs';
import {Validation} from '@/internal/inputs';
import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';

import classes from './InputRadio.module.css';

export type Props = DataAttributes &
    LibraryProps &
    NativePropsInteractive &
    CallbackPropsInteractive & {
        validation?: keyof typeof Validation;
        validator?: (event: ChangeEvent<HTMLInputElement>) => void;
        label?: string;
    };

export const InputRadio = forwardRef<HTMLInputElement, Props>(
    (
        {
            className,
            validation,
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
            validator = event => {
                event.target.setCustomValidity('');
            },
            ...nativeProps
        },
        ref
    ) => {
        const [_, setValidity] = useState(validation);
        const handleChange = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                const nextValidationState = event.target.checkValidity() ? Validation.valid : Validation.error;
                setValidity(nextValidationState);
                onChange(event);
            },
            [setValidity, onChange]
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
                    onInput={validator}
                />
                <label className={classes.label} htmlFor={id}>
                    {label}
                </label>
            </div>
        );
    }
);

InputRadio.displayName = 'InputRadio';
