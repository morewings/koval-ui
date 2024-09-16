import type {ChangeEvent, FC} from 'react';
import {forwardRef, useCallback} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import type {NativePropsTextual, CallbackPropsTextual, ValidationProps} from '@/internal/inputs';
import {
    useRevalidateOnFormChange,
    useExternalValidation,
    useValidationIcon,
    ValidationState,
    useValidation,
} from '@/internal/inputs';
import {useInternalRef} from '@/internal/hooks/useInternalRef.ts';

import classes from './TemplateName.module.css';

export type Props = DataAttributes &
    LibraryProps &
    NativePropsTextual &
    CallbackPropsTextual &
    ValidationProps & {
        prefix?: FC;
    };

export const TemplateName = forwardRef<HTMLInputElement, Props>(
    (
        {
            prefix: Prefix,
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
            validation,
            errorMessage,
            revalidateOnFormChange,
            ...nativeProps
        },
        ref
    ) => {
        const inputRef = useInternalRef(ref);

        const hasValidators =
            Boolean(validation) ||
            Boolean(nativeProps.required) ||
            typeof nativeProps.maxLength === 'number' ||
            typeof nativeProps.minLength === 'number' ||
            typeof nativeProps.pattern === 'string';

        const {validateTextual, validity, setValidity} = useValidation({validation, hasValidators});

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
        return (
            <div className={classNames(classes.wrapper, className)}>
                {Prefix && <Prefix />}
                <input
                    {...nativeProps}
                    placeholder={placeholder}
                    className={classes.input}
                    ref={inputRef}
                    disabled={disabled}
                    value={value}
                    defaultValue={defaultValue}
                    onChange={handleChange}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onKeyUp={onKeyUp}
                    onKeyDown={onKeyDown}
                    onInvalid={handleInvalid}
                    onInput={validateTextual}
                />
                {validity && <ValidationIcon />}
            </div>
        );
    }
);

TemplateName.displayName = 'TemplateName';
