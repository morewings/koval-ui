import type {ChangeEvent} from 'react';
import {useMemo} from 'react';
import {useState} from 'react';
import {forwardRef, useCallback} from 'react';
import classNames from 'classnames';

import {IconError, IconValid, IconLoader, IconLock, IconLockOpen} from '@/internal/Icons';
import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import type {NativePropsTextual, CallbackPropsTextual, ValidationProps} from '@/internal/inputs';
import {
    ValidationState,
    defaultValidator,
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
            validatorFn = defaultValidator,
            id,
            readOnly,
            size = 16,
            revalidateOnFormChange,
            validationState,
            errorMessage,
            ...nativeProps
        },
        ref
    ) => {
        const {validateTextual, validity, setValidity} = useValidation({validatorFn});

        const inputRef = useInternalRef(ref);
        useRevalidateOnFormChange(inputRef, validateTextual, revalidateOnFormChange);
        useExternalValidation({inputRef, setValidity, validationState, errorMessage});

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
            <div className={classNames(classes.wrapper, className)}>
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
                {validity && <ValidationIcon />}
            </div>
        );
    }
);

InputPassword.displayName = 'InputPassword';
