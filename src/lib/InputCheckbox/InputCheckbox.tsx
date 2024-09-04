import type {ChangeEvent} from 'react';
import {forwardRef, useCallback, useEffect} from 'react';
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
        /** Set a text for the checkbox label */
        label?: string;
        /**
         * Set an indeterminate state for the checkbox
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/:indeterminate
         */
        indeterminate?: boolean;
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
            indeterminate = false,
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

        useEffect(() => {
            if (inputRef.current) {
                inputRef.current.indeterminate = indeterminate;
            }
        }, [indeterminate, inputRef]);

        return (
            <div className={classNames(classes.wrapper, className)}>
                <input
                    {...nativeProps}
                    className={classNames(classes.input, {[classes.indeterminate]: indeterminate})}
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
                {label && (
                    <label
                        className={classNames(classes.label, {[classes.required]: required})}
                        htmlFor={id}>
                        {label}
                    </label>
                )}
                {validity && <ValidationIcon className={classes.icon} />}
            </div>
        );
    }
);

InputCheckbox.displayName = 'InputCheckbox';
