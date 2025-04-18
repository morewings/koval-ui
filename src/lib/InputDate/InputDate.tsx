import type {ChangeEvent, FocusEvent} from 'react';
import {useRef} from 'react';
import {forwardRef, useCallback} from 'react';
import classNames from 'classnames';

import {IconCalendar} from '@/internal/Icons';
import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import type {NativePropsTextual, CallbackPropsTextual, ValidationProps} from '@/internal/inputs';
import {
    useRevalidateOnFormChange,
    useExternalValidation,
    useValidationIcon,
    ValidationState,
    useValidation,
} from '@/internal/inputs';
import {useInternalId} from '@/internal/hooks/useInternalId.ts';
import {useInternalRef} from '@/internal/hooks/useInternalRef.ts';

import classes from './InputDate.module.css';

export type Props = DataAttributes &
    LibraryProps &
    Omit<NativePropsTextual, 'maxLength' | 'minLength' | 'autoComplete' | 'inputMode' | 'pattern'> &
    CallbackPropsTextual &
    ValidationProps & {min?: string; max?: string};

export const InputDate = forwardRef<HTMLInputElement, Props>(
    (
        {
            id: idProp,
            className,
            placeholder = 'YYYY-MM-DD',
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
        const hasValidators =
            Boolean(validation) ||
            typeof nativeProps.min === 'string' ||
            typeof nativeProps.max === 'string';

        const id = useInternalId(idProp);
        const labelRef = useRef<HTMLLabelElement>(null);

        const {validateTextual, validity, setValidity} = useValidation({validation, hasValidators});

        const inputRef = useInternalRef(ref);

        useExternalValidation({errorMessage, inputRef, setValidity, validation});
        useRevalidateOnFormChange(inputRef, validateTextual, revalidateOnFormChange);

        const ValidationIcon = useValidationIcon(validity);

        const displayValue = (value ?? defaultValue) as string;
        const handleChange = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                onChange(event);
                if (labelRef?.current) {
                    labelRef.current.innerText = event.target.value;
                }
            },
            [onChange]
        );

        const handleInvalid = useCallback(() => {
            setValidity(ValidationState.error);
        }, [setValidity]);

        const handleFocus = useCallback(
            (event: FocusEvent<HTMLInputElement>) => {
                onFocus(event);
                event.target.showPicker();
            },
            [onFocus]
        );
        const handleBlur = useCallback(
            (event: FocusEvent<HTMLInputElement>) => {
                onBlur(event);
            },
            [onBlur]
        );

        const handleInput = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                validateTextual(event);
            },
            [validateTextual]
        );

        return (
            <div
                className={classNames(
                    classes.wrapper,
                    {[classes.withValidationIcon]: displayIcon},
                    className
                )}>
                <div className={classes.toggle}>
                    <input
                        {...nativeProps}
                        id={id}
                        ref={inputRef}
                        className={classes.input}
                        type="date"
                        disabled={disabled}
                        value={value}
                        defaultValue={defaultValue}
                        onChange={handleChange}
                        onInvalid={handleInvalid}
                        onInput={handleInput}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onKeyUp={onKeyUp}
                        onKeyDown={onKeyDown}
                    />
                    <label htmlFor={id} className={classes.icon}>
                        <IconCalendar />
                    </label>
                </div>
                <label htmlFor={id} className={classes.label} ref={labelRef}>
                    {displayValue || placeholder}
                </label>
                {displayIcon && validity && <ValidationIcon className={classes.validity} />}
            </div>
        );
    }
);

InputDate.displayName = 'InputDate';
