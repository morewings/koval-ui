import type {ChangeEvent, KeyboardEvent, InputHTMLAttributes} from 'react';
import {forwardRef, useCallback} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import type {CallbackPropsTextual, ValidationProps, NativePropsTextual} from '@/internal/inputs';
import {
    useRevalidateOnFormChange,
    useExternalValidation,
    useValidationIcon,
    ValidationState,
    useValidation,
} from '@/internal/inputs';
import {IconNumeric} from '@/internal/Icons';
import {useInternalId} from '@/internal/hooks/useInternalId.ts';
import {useInternalRef} from '@/internal/hooks/useInternalRef.ts';

import classes from './InputNumeric.module.css';

enum Modes {
    natural = 'natural',
    integer = 'integer',
    floating = 'floating',
    scientific = 'scientific',
}

const patternMapping = {
    [Modes.natural]: '(?:0|[1-9]\\d*)',
    [Modes.integer]: '[+\\-]?(?:0|[1-9]\\d*)',
    [Modes.floating]: '[+\\-]?(?:0|[1-9]\\d*)(?:\\.\\d+)?',
    [Modes.scientific]: '[+\\-]?(?:0|[1-9]\\d*)(?:\\.\\d+)?(?:[eE][+\\-]?\\d+)?',
};

export type Props = DataAttributes &
    LibraryProps &
    Omit<NativePropsTextual, 'pattern' | 'inputMode' | 'autoComplete'> &
    CallbackPropsTextual &
    ValidationProps & {
        /**
         * Specify the amount of increment/decrement applied to the value when the user presses arrow keys
         */
        step?: number;
        /**
         * Define the width of the input in characters
         */
        size?: InputHTMLAttributes<HTMLInputElement>['size'];
        /** Select a mode of numeric input. `scientific` mode disables arrow stepper */
        mode?: keyof typeof Modes;
    };

export const InputNumeric = forwardRef<HTMLInputElement, Props>(
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
            validation,
            errorMessage,
            id: idProp,
            step = 1,
            size = 12,
            mode = Modes.natural,
            revalidateOnFormChange,
            ...nativeProps
        },
        ref
    ) => {
        const inputRef = useInternalRef(ref);

        const id = useInternalId(idProp);

        const hasValidators = Boolean(validation) || Boolean(nativeProps.required);

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

        const handleKeyDown = useCallback(
            (event: KeyboardEvent<HTMLInputElement>) => {
                const inputValue = (event.target as HTMLInputElement).value;
                if (event.key === 'ArrowUp' && mode !== Modes.scientific) {
                    const nextValue = Number(inputValue || 0) + step;
                    (event.target as HTMLInputElement).value = nextValue.toString();
                }
                if (event.key === 'ArrowDown' && mode !== Modes.scientific) {
                    const nextValue = Number(inputValue || 0) - step;
                    (event.target as HTMLInputElement).value = nextValue.toString();
                }
                onKeyDown(event);
            },
            [mode, onKeyDown, step]
        );

        const handleKeyUp = useCallback(
            (event: KeyboardEvent<HTMLInputElement>) => {
                if (
                    event.key === 'ArrowDown' ||
                    (event.key === 'ArrowUp' && mode !== Modes.scientific)
                ) {
                    event.currentTarget.reportValidity();
                    onChange(event as unknown as ChangeEvent<HTMLInputElement>);
                }
                onKeyUp(event);
            },
            [mode, onChange, onKeyUp]
        );

        const pattern = patternMapping[mode];

        return (
            <div className={classNames(classes.wrapper, className)}>
                <label className={classes.prefix} htmlFor={id}>
                    <IconNumeric />
                </label>
                <input
                    {...nativeProps}
                    autoComplete="off"
                    ref={inputRef}
                    size={size}
                    id={id}
                    type="text"
                    inputMode="decimal"
                    pattern={pattern}
                    placeholder={placeholder}
                    className={classes.input}
                    disabled={disabled}
                    value={value}
                    defaultValue={defaultValue}
                    onChange={handleChange}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onKeyUp={handleKeyUp}
                    onKeyDown={handleKeyDown}
                    onInvalid={handleInvalid}
                    onInput={validateTextual}
                />
                {validity && <ValidationIcon />}
            </div>
        );
    }
);

InputNumeric.displayName = 'InputNumeric';
