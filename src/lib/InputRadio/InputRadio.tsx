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
            type = 'text',
            placeholder = '',
            disabled,
            value: valueProp,
            onChange = () => {},
            onFocus = () => {},
            onBlur = () => {},
            onKeyDown = () => {},
            onKeyUp = () => {},
            defaultValue,
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
        const ValidationIcon = {
            [Validation.error]: IconError,
            [Validation.valid]: IconValid,
            [Validation.inProgress]: IconLoader,
        }[validity!];
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
                {Prefix && <Prefix />}
                <input
                    {...nativeProps}
                    placeholder={placeholder}
                    className={classes.input}
                    ref={ref}
                    disabled={disabled}
                    type={type}
                    value={valueProp}
                    defaultValue={defaultValue}
                    onChange={handleChange}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onKeyUp={onKeyUp}
                    onKeyDown={onKeyDown}
                    onInput={validator}
                />
                {validity && <ValidationIcon />}
            </div>
        );
    }
);

InputRadio.displayName = 'InputRadio';
