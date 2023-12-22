import type {ChangeEvent, FocusEvent} from 'react';
import {useMemo} from 'react';
import {useState} from 'react';
import {forwardRef, useCallback} from 'react';
import classNames from 'classnames';
import {useLocalTheme} from 'css-vars-hook';

import {IconError, IconValid, IconLoader, IconPalette} from '@/internal/Icons';
import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import type {NativePropsTextual, CallbackPropsTextual, ValidationProps} from '@/internal/inputs';
import {defaultValidator} from '@/internal/inputs';
import {ValidationState, useValidation} from '@/internal/inputs';
import {useControllableState} from '@/internal/hooks/useControllableState.ts';

import classes from './InputColor.module.css';
import {invertColor} from './invertColor.ts';

export type Props = DataAttributes &
    LibraryProps &
    Omit<NativePropsTextual, 'maxLength' | 'minLength' | 'autoComplete' | 'inputMode'> &
    CallbackPropsTextual &
    ValidationProps & {min?: string; max?: string};

export const InputColor = forwardRef<HTMLInputElement, Props>(
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

        const {LocalRoot, setTheme} = useLocalTheme();
        const theme = useMemo(
            () => ({
                selectedColor: displayValue as string,
                invertedColor: invertColor(displayValue as string, true),
                borderColor: invertColor(displayValue as string, false),
            }),
            [displayValue]
        );
        const handleChange = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                onChange(event);
            },
            [onChange]
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
                setDisplayValue(event.target.value);
                setTheme({
                    selectedColor: event.target.value,
                    invertedColor: invertColor(event.target.value, true),
                    borderColor: invertColor(event.target.value, false),
                });
            },
            [onBlur, setDisplayValue, setTheme]
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
            <LocalRoot theme={theme} className={classNames(classes['input-color'], className)}>
                <div className={classes.toggle}>
                    <input
                        {...nativeProps}
                        ref={ref}
                        className={classes.input}
                        type="color"
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
                    <IconPalette className={classNames(classes.icon, {[classes.focus]: isDisplayFocused})} />
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
            </LocalRoot>
        );
    }
);

InputColor.displayName = 'InputColor';
