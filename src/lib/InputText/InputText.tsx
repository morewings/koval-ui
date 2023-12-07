import {forwardRef} from 'react';
import type {FC} from 'react';
import classNames from 'classnames';

import {IconError, IconValid, IconLoader} from '@/lib/Icons';
import type {NativeProps, CallbackProps} from '@/internal/inputs/API.ts';
import type {LibraryProps, DataAttributes} from '@/internal/LibraryAPI';

import classes from './InputText.module.css';

enum Validation {
    error = 'error',
    valid = 'valid',
    inProgress = 'inProgress',
}

type Props = DataAttributes &
    LibraryProps &
    NativeProps &
    CallbackProps & {
        type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url';
        prefix?: FC;
        validation?: keyof typeof Validation;
    };

export const InputText = forwardRef<HTMLInputElement, Props>(
    (
        {
            prefix: Prefix,
            className,
            validation,
            type = 'text',
            placeholder,
            disabled,
            value: valueProp,
            onChange = () => {},
            onFocus = () => {},
            onBlur = () => {},
            onKeyDown = () => {},
            onKeyUp = () => {},
            defaultValue,
            ...nativeProps
        },
        ref
    ) => {
        const ValidationIcon = {
            [Validation.error]: IconError,
            [Validation.valid]: IconValid,
            [Validation.inProgress]: IconLoader,
        }[validation!];
        return (
            <div className={classNames(classes.wrapper, className)}>
                {Prefix && <Prefix />}
                <input
                    {...nativeProps}
                    className={classes.input}
                    ref={ref}
                    disabled={disabled}
                    type={type}
                    value={valueProp}
                    defaultValue={defaultValue}
                    onChange={onChange}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onKeyUp={onKeyUp}
                    onKeyDown={onKeyDown}
                />
                {validation && <ValidationIcon />}
            </div>
        );
    }
);

InputText.displayName = 'InputText';
