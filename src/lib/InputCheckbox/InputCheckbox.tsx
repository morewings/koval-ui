import type {ChangeEvent} from 'react';
import {forwardRef, useCallback} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import {
    ValidationState,
    useValidation,
    useRevalidateOnFormChange,
    useExternalValidation,
    useValidationIcon,
} from '@/internal/inputs';
import type {
    NativePropsInteractive,
    CallbackPropsInteractive,
    ValidationProps,
} from '@/internal/inputs';
import {useInternalId} from '@/internal/hooks/useInternalId.ts';
import {useInternalRef} from '@/internal/hooks/useInternalRef.ts';

import classes from './InputCheckbox.module.css';

export type Props = DataAttributes &
    LibraryProps &
    NativePropsInteractive &
    CallbackPropsInteractive &
    ValidationProps & {
        /** Set a text for checkbox label */
        label?: string;
    };

export const InputCheckbox = forwardRef<HTMLInputElement, Props>(
    (
        {
            className,
            disabled,
            value,
            onChange = () => {},
            onFocus = () => {},
            onBlur = () => {},
            onKeyDown = () => {},
            onKeyUp = () => {},
            checked,
            defaultChecked,
            id: idProp,
            label,
            required,
            revalidateOnFormChange,
            validation,
            errorMessage,
            ...nativeProps
        },
        ref
    ) => {
        const id = useInternalId(idProp);

        const hasValidators = Boolean(validation) || Boolean(required);

        const {validateInteractive, validity, setValidity} = useValidation({
            validation,
            hasValidators,
        });

        const inputRef = useInternalRef(ref);
        useRevalidateOnFormChange(inputRef, validateInteractive, revalidateOnFormChange);

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
                <input
                    {...nativeProps}
                    className={classes.input}
                    ref={inputRef}
                    disabled={disabled}
                    type="checkbox"
                    id={id}
                    value={value}
                    checked={checked}
                    defaultChecked={defaultChecked}
                    onChange={handleChange}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onKeyUp={onKeyUp}
                    onKeyDown={onKeyDown}
                    onInput={validateInteractive}
                    onInvalid={handleInvalid}
                    required={required}
                />
                <label
                    className={classNames(classes.label, {[classes.required]: required})}
                    htmlFor={id}>
                    {label}
                </label>
                {validity && <ValidationIcon className={classes.icon} />}
            </div>
        );
    }
);

InputCheckbox.displayName = 'InputCheckbox';
