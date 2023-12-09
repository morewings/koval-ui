import type {ChangeEvent} from 'react';
import {forwardRef, useState, useCallback} from 'react';
import classNames from 'classnames';

import {IconError, IconValid, IconLoader} from '@/lib/Icons';

import classes from './InputRadio.module.css';
import {Validation} from './Types.ts';
import type {Props} from './Types.ts';

export const InputRadio = forwardRef<HTMLInputElement, Props>(
    (
        {
            prefix: Prefix,
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
                if (event.target.value.length > 3) {
                    event.target.setCustomValidity('too long');
                } else {
                    event.target.setCustomValidity('');
                }
            },
            ...nativeProps
        },
        ref
    ) => {
        const [validity, setValidity] = useState(validation);
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
