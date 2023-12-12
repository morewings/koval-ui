import type {ChangeEvent, FC} from 'react';
import {forwardRef, useState, useCallback} from 'react';
import classNames from 'classnames';

import {IconError, IconValid, IconLoader} from '@/lib/Icons';
import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import type {NativePropsTextual, CallbackPropsTextual} from '@/internal/inputs';
import {Validation} from '@/internal/inputs';

import classes from './InputText.module.css';

type Props = DataAttributes &
    LibraryProps &
    NativePropsTextual &
    CallbackPropsTextual & {
        type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url';
        prefix?: FC;
        validatorFn?: (value: CallbackPropsTextual['value']) => string | true;
    };

export const InputText = forwardRef<HTMLInputElement, Props>(
    (
        {
            prefix: Prefix,
            className,
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
            validatorFn = value => {
                if (value && `${value}`.length > 3) {
                    return 'too long';
                } else {
                    return true;
                }
            },
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
                const nextValidationState = event.target.checkValidity() ? Validation.valid : Validation.error;
                setValidity(nextValidationState);
                onChange(event);
            },
            [setValidity, onChange]
        );
        const handleInput = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                const validationResult = validatorFn(event.target.value);
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
                    onInput={handleInput}
                />
                {validity && <ValidationIcon />}
            </div>
        );
    }
);

InputText.displayName = 'InputText';
