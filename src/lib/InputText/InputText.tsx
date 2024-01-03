import type {ChangeEvent, FC, InputHTMLAttributes} from 'react';
import {forwardRef, useCallback} from 'react';
import classNames from 'classnames';

import {IconError, IconValid, IconLoader} from '@/internal/Icons';
import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import type {NativePropsTextual, CallbackPropsTextual, ValidationProps} from '@/internal/inputs';
import {ValidationState, defaultValidator, useValidation} from '@/internal/inputs';
import {useInternalId} from '@/internal/hooks/useInternalId.ts';

import classes from './InputText.module.css';

export type Props = DataAttributes &
    LibraryProps &
    NativePropsTextual &
    CallbackPropsTextual &
    ValidationProps & {
        /**
         * Define a type of TextInput. Allows developer to optionally set one from supported
         * text-like input types instead of default 'text'.
         * Non-text types such as `number` or `week` are not allowed.
         * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types
         */
        type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url';
        /**
         * Define the width of the input in characters
         */
        size?: InputHTMLAttributes<HTMLInputElement>['size'];
        prefix?: FC;
    };

export const InputText = forwardRef<HTMLInputElement, Props>(
    (
        {
            prefix: Prefix,
            className,
            type = 'text',
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
            readOnly,
            size = 16,
            id,
            ...nativeProps
        },
        ref
    ) => {
        const {validateTextual, validity, setValidity} = useValidation({validatorFn});
        const ValidationIcon = {
            [ValidationState.error]: IconError,
            [ValidationState.valid]: IconValid,
            [ValidationState.inProgress]: IconLoader,
        }[validity!];
        const handleChange = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                onChange(event);
            },
            [onChange]
        );

        const handleInvalid = useCallback(() => {
            setValidity(ValidationState.error);
        }, [setValidity]);

        const handleSelect = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                readOnly && event.target.select();
            },
            [readOnly]
        );

        const inputId = useInternalId(id);

        return (
            <div className={classNames(classes.wrapper, className)}>
                {Prefix && (
                    <label className={classes.prefix} htmlFor={inputId}>
                        <Prefix />
                    </label>
                )}
                <input
                    {...nativeProps}
                    size={size}
                    id={inputId}
                    readOnly={readOnly}
                    placeholder={placeholder}
                    className={classes.input}
                    ref={ref}
                    disabled={disabled}
                    type={type}
                    value={value}
                    defaultValue={defaultValue}
                    onChange={handleChange}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onKeyUp={onKeyUp}
                    onKeyDown={onKeyDown}
                    onInvalid={handleInvalid}
                    onInput={validateTextual}
                    onSelect={handleSelect}
                />
                {validity && <ValidationIcon />}
            </div>
        );
    }
);

InputText.displayName = 'InputText';
