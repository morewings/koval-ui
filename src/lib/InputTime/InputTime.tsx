import type {ChangeEvent, KeyboardEvent} from 'react';
import {forwardRef, useCallback} from 'react';
import classNames from 'classnames';

import {IconClock} from '@/internal/Icons';
import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import type {NativePropsTextual, CallbackPropsTextual, ValidationProps} from '@/internal/inputs';
import {useExternalValidation} from '@/internal/inputs';
import {useRevalidateOnFormChange} from '@/internal/inputs';
import {ValidationState, useValidationIcon, useValidation} from '@/internal/inputs';
import {useInternalRef} from '@/internal/hooks/useInternalRef.ts';

import classes from './InputTime.module.css';

export type Props = DataAttributes &
    LibraryProps &
    Omit<NativePropsTextual, 'maxLength' | 'minLength' | 'autoComplete' | 'inputMode' | 'size'> &
    Omit<CallbackPropsTextual, 'onChange'> &
    ValidationProps & {
        onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
        min?: string;
        max?: string;
    };

export const InputTime = forwardRef<HTMLInputElement, Props>(
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
            revalidateOnFormChange,
            validation,
            errorMessage,
            displayIcon = true,
            ...nativeProps
        },
        ref
    ) => {
        const inputRef = useInternalRef(ref);
        const hasValidators =
            Boolean(validation) ||
            typeof nativeProps.min === 'string' ||
            typeof nativeProps.max === 'string';

        const {validity, setValidity, validateTextual} = useValidation({validation, hasValidators});

        useRevalidateOnFormChange(inputRef, validateTextual, revalidateOnFormChange);
        useExternalValidation({errorMessage, inputRef, setValidity, validation});

        const ValidationIcon = useValidationIcon(validity);

        const handleInvalid = useCallback(() => {
            setValidity(ValidationState.error);
        }, [setValidity]);

        const handleIconClick = useCallback(() => {
            inputRef.current?.focus();
            inputRef.current?.showPicker();
        }, [inputRef]);

        const handleKeyDown = useCallback(
            (event: KeyboardEvent<HTMLInputElement>) => {
                onKeyDown(event);
            },
            [onKeyDown]
        );

        const handleKeyUp = useCallback(
            (event: KeyboardEvent<HTMLInputElement>) => {
                onKeyUp(event);
            },
            [onKeyUp]
        );

        const handleChange = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                const isValid = event.target.checkValidity();
                isValid && setValidity(ValidationState.valid);
                onChange(event);
            },
            [onChange, setValidity]
        );

        return (
            <div className={classNames(classes.wrapper, className)}>
                <IconClock tabIndex={-1} onClick={handleIconClick} className={classes.icon} />
                <input
                    {...nativeProps}
                    type="time"
                    placeholder={placeholder}
                    className={classes.input}
                    ref={inputRef}
                    disabled={disabled}
                    value={value}
                    defaultValue={defaultValue}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onKeyUp={handleKeyUp}
                    onKeyDown={handleKeyDown}
                    onInvalid={handleInvalid}
                    onChange={handleChange}
                    onInput={validateTextual}
                />
                {displayIcon && validity && <ValidationIcon />}
            </div>
        );
    }
);

InputTime.displayName = 'InputTime';
