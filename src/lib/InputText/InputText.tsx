import type {ChangeEvent, FC, InputHTMLAttributes} from 'react';
import {Fragment} from 'react';
import {forwardRef, useCallback} from 'react';
import classNames from 'classnames';

import {IconErrorOutline, IconValid, IconLoader} from '@/internal/Icons';
import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import type {NativePropsTextual, CallbackPropsTextual, ValidationProps} from '@/internal/inputs';
import {
    ValidationState,
    useValidation,
    useRevalidateOnFormChange,
    useExternalValidation,
} from '@/internal/inputs';
import {useInternalId} from '@/internal/hooks/useInternalId.ts';
import {useInternalRef} from '@/internal/hooks/useInternalRef.ts';

import classes from './InputText.module.css';

export type Props = DataAttributes &
    LibraryProps &
    NativePropsTextual &
    CallbackPropsTextual &
    ValidationProps & {
        /**
         * Define a type of TextInput. Allows a developer to optionally set one from supported
         * text-like input types instead of default 'text'.
         * Non-text types such as `number` or `week` aren't allowed.
         * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types
         */
        type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url';
        /**
         * Define the width of the input in characters
         */
        size?: InputHTMLAttributes<HTMLInputElement>['size'];
        /**
         * Provide an icon to prepend to the input
         */
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
            readOnly,
            size = 16,
            id,
            required,
            revalidateOnFormChange,
            errorMessage = ValidationState.error,
            validation,
            displayIcon = true,
            ...nativeProps
        },
        ref
    ) => {
        const inputRef = useInternalRef(ref);

        const hasValidators =
            Boolean(validation) ||
            Boolean(required) ||
            typeof nativeProps.maxLength === 'number' ||
            typeof nativeProps.minLength === 'number' ||
            typeof nativeProps.pattern === 'string';

        const {validateTextual, validity, setValidity} = useValidation({
            validation,
            hasValidators,
        });

        useExternalValidation({errorMessage, inputRef, setValidity, validation});

        useRevalidateOnFormChange(inputRef, validateTextual, revalidateOnFormChange);

        const ValidationIcon = {
            [ValidationState.error]: IconErrorOutline,
            [ValidationState.valid]: IconValid,
            [ValidationState.inProgress]: IconLoader,
            [ValidationState.pristine]: Fragment,
        }[validity!];

        const handleChange = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                onChange(event);
            },
            [onChange]
        );

        const handleInvalid = useCallback(() => {
            required && setValidity(ValidationState.error);
        }, [required, setValidity]);

        const handleSelect = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                readOnly && event.target.select();
            },
            [readOnly]
        );

        const inputId = useInternalId(id);

        return (
            <div
                className={classNames(
                    classes.wrapper,
                    {[classes.withValidationIcon]: displayIcon},
                    className
                )}>
                {Prefix && (
                    <label className={classes.prefix} htmlFor={inputId}>
                        <Prefix />
                    </label>
                )}
                <input
                    {...nativeProps}
                    required={required}
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
                {displayIcon && validity && <ValidationIcon className={classes.validation} />}
            </div>
        );
    }
);

InputText.displayName = 'InputText';
