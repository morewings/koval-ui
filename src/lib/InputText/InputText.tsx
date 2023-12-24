import type {ChangeEvent, FC} from 'react';
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
        type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url';
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
            value: valueProp,
            onChange = () => {},
            onFocus = () => {},
            onBlur = () => {},
            onKeyDown = () => {},
            onKeyUp = () => {},
            defaultValue,
            validatorFn = defaultValidator,
            readOnly,
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
                    id={inputId}
                    readOnly={readOnly}
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
