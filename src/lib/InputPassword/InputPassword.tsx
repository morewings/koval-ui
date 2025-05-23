import type {ChangeEvent} from 'react';
import {useMemo} from 'react';
import {useState} from 'react';
import {forwardRef, useCallback} from 'react';
import classNames from 'classnames';

import {IconLock, IconLockOpen} from '@/internal/Icons';
import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import type {NativePropsTextual, CallbackPropsTextual, ValidationProps} from '@/internal/inputs';
import {
    ValidationState,
    useValidationIcon,
    useValidation,
    useRevalidateOnFormChange,
    useExternalValidation,
} from '@/internal/inputs';
import {useInternalId} from '@/internal/hooks/useInternalId.ts';
import {useInternalRef} from '@/internal/hooks/useInternalRef.ts';

import classes from './InputPassword.module.css';

export type Props = DataAttributes &
    LibraryProps &
    NativePropsTextual &
    CallbackPropsTextual &
    ValidationProps;

enum InputType {
    password = 'password',
    text = 'text',
}

export const InputPassword = forwardRef<HTMLInputElement, Props>(
    (
        {
            className,
            placeholder = '',
            disabled,
            value,
            onChange = () => {},
            onFocus = () => {},
            onBlur = () => {},
            onKeyDown = () => {},
            onKeyUp = () => {},
            defaultValue,
            id,
            readOnly,
            size = 16,
            revalidateOnFormChange,
            validation,
            errorMessage,
            displayIcon = true,
            ...nativeProps
        },
        ref
    ) => {
        const hasValidators =
            Boolean(validation) ||
            Boolean(nativeProps.required) ||
            typeof nativeProps.maxLength === 'number' ||
            typeof nativeProps.minLength === 'number' ||
            typeof nativeProps.pattern === 'string';

        const {validateTextual, validity, setValidity} = useValidation({validation, hasValidators});

        const inputRef = useInternalRef(ref);
        useRevalidateOnFormChange(inputRef, validateTextual, revalidateOnFormChange);
        useExternalValidation({errorMessage, inputRef, setValidity, validation});

        const ValidationIcon = useValidationIcon(validity);
        const handleChange = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                onChange(event);
            },
            [onChange]
        );

        const handleInvalid = useCallback(() => {
            setValidity(ValidationState.error);
        }, [setValidity]);

        const inputId = useInternalId(id);

        const handleSelect = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                readOnly && event.target.select();
            },
            [readOnly]
        );

        const [type, setType] = useState<keyof typeof InputType>(InputType.password);

        const Icon = useMemo(
            () =>
                ({
                    [InputType.text]: IconLockOpen,
                    [InputType.password]: IconLock,
                })[type],
            [type]
        );

        const handleIconClick = useCallback(() => {
            type === InputType.password && setType(InputType.text);
            type === InputType.text && setType(InputType.password);
        }, [type, setType]);

        return (
            <div
                className={classNames(
                    classes.wrapper,
                    {[classes.withValidationIcon]: displayIcon},
                    className
                )}>
                <label
                    tabIndex={-1}
                    onClick={handleIconClick}
                    className={classes.prefix}
                    htmlFor={inputId}>
                    <Icon />
                </label>
                <input
                    {...nativeProps}
                    size={size}
                    id={inputId}
                    readOnly={readOnly}
                    placeholder={placeholder}
                    className={classes.input}
                    ref={inputRef}
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
                {displayIcon && validity && <ValidationIcon />}
            </div>
        );
    }
);

InputPassword.displayName = 'InputPassword';
