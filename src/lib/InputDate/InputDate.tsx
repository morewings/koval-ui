import type {ChangeEvent, FocusEvent} from 'react';
import {useState} from 'react';
import {forwardRef, useCallback} from 'react';
import classNames from 'classnames';

import {IconError, IconValid, IconLoader, IconCalendar} from '@/internal/Icons';
import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import type {NativePropsTextual, CallbackPropsTextual, ValidationProps} from '@/internal/inputs';
import {defaultValidator} from '@/internal/inputs';
import {ValidationState, useValidation} from '@/internal/inputs';
import {useControllableState} from '@/internal/hooks/useControllableState.ts';

import classes from './InputDate.module.css';

export type Props = DataAttributes &
    LibraryProps &
    Omit<NativePropsTextual, 'maxLength' | 'minLength' | 'autoComplete' | 'inputMode'> &
    CallbackPropsTextual &
    ValidationProps & {min?: string; max?: string};

export const InputDate = forwardRef<HTMLInputElement, Props>(
    (
        {
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
            validatorFn = defaultValidator,
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
        const [displayValue, setDisplayValue] = useControllableState({value, defaultValue});
        const handleChange = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                onChange(event);
                setDisplayValue(event.target.value);
            },
            [onChange, setDisplayValue]
        );

        const handleInvalid = useCallback(() => {
            setValidity(ValidationState.error);
            setInvalid(true);
        }, [setValidity]);

        const handleFocus = useCallback(
            (event: FocusEvent<HTMLInputElement>) => {
                onFocus(event);
                setFocused(true);
            },
            [onFocus]
        );
        const handleBlur = useCallback(
            (event: FocusEvent<HTMLInputElement>) => {
                onBlur(event);
                setFocused(false);
            },
            [onBlur]
        );

        const [isDisplayFocused, setDisplayFocused] = useState(false);
        const [isFocused, setFocused] = useState(false);
        const [isInvalid, setInvalid] = useState(false);

        const handleDisplayFocus = useCallback(
            (event: FocusEvent<HTMLInputElement>) => {
                event.target.select();
                setDisplayFocused(true);
            },
            [setDisplayFocused]
        );

        const handleDisplayBlur = useCallback(() => {
            setDisplayFocused(false);
        }, [setDisplayFocused]);

        const handleSelect = useCallback((event: FocusEvent<HTMLInputElement>) => {
            event.target.select();
        }, []);

        const handleInput = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                setInvalid(false);
                validateTextual(event);
            },
            [validateTextual, setInvalid]
        );

        return (
            <div className={classNames(classes['input-date'], className)}>
                <div className={classes.toggle}>
                    <input
                        {...nativeProps}
                        ref={ref}
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
                    <IconCalendar className={classNames(classes.icon, {[classes.focus]: isDisplayFocused})} />
                </div>
                <input
                    value={displayValue}
                    type="text"
                    tabIndex={-1}
                    readOnly={true}
                    placeholder={placeholder}
                    onBlur={handleDisplayBlur}
                    onFocus={handleDisplayFocus}
                    onSelect={handleSelect}
                    disabled={disabled}
                    className={classNames(classes['input-display'], {
                        [classes.invalid]: isInvalid,
                        [classes.focus]: isFocused,
                    })}
                />
                {validity && <ValidationIcon className={classes.validity} />}
            </div>
        );
    }
);

InputDate.displayName = 'InputDate';
