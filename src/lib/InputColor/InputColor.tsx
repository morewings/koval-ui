import type {ChangeEvent, FocusEvent, InputHTMLAttributes} from 'react';
import {useMemo, useRef} from 'react';
import {forwardRef, useCallback} from 'react';
import classNames from 'classnames';
import {useLocalTheme} from 'css-vars-hook';

import {IconPalette} from '@/internal/Icons';
import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import type {CallbackPropsTextual, ValidationProps, NativePropsInteractive} from '@/internal/inputs';
import {useInternalId} from '@/internal/hooks/useInternalId.ts';

import classes from './InputColor.module.css';
import {invertColor} from './invertColor.ts';

export type Props = DataAttributes &
    LibraryProps &
    NativePropsInteractive &
    CallbackPropsTextual &
    Omit<ValidationProps, 'validatorFn'> & {
        /**
         * Set text for placeholder.
         * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#placeholder
         */
        placeholder?: InputHTMLAttributes<HTMLInputElement>['placeholder'];
    };

export const InputColor = forwardRef<HTMLInputElement, Props>(
    (
        {
            className,
            placeholder = '#??????',
            disabled,
            value,
            onChange = () => {},
            onFocus = () => {},
            onBlur = () => {},
            onKeyDown = () => {},
            onKeyUp = () => {},
            defaultValue,
            id: idProp,
            ...nativeProps
        },
        ref
    ) => {
        const id = useInternalId(idProp);

        const {LocalRoot, setTheme} = useLocalTheme();
        const displayValue = (value ?? defaultValue) as string;
        const theme = useMemo(
            () => ({
                selectedColor: displayValue,
                invertedColor: invertColor(displayValue, true),
            }),
            [displayValue]
        );

        const handleFocus = useCallback(
            (event: FocusEvent<HTMLInputElement>) => {
                onFocus(event);
                setTheme({
                    selectedColor: event.target.value,
                    invertedColor: invertColor(event.target.value, true),
                });
            },
            [onFocus, setTheme]
        );

        const labelRef = useRef<HTMLLabelElement>(null);

        const handleBlur = useCallback(
            (event: FocusEvent<HTMLInputElement>) => {
                setTheme({
                    invertedColor: invertColor(event.target.value, true),
                });

                if (labelRef?.current) {
                    labelRef.current.innerText = event.target.value;
                }
                onBlur(event);
                onChange(event);
            },
            [setTheme, onBlur, onChange]
        );

        /* onChange callback makes color picker to lose focus. It triggered in onBlur instead. */
        const handleChange = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                setTheme({
                    selectedColor: event.target.value,
                    invertedColor: 'transparent',
                });
            },
            [setTheme]
        );

        return (
            <LocalRoot theme={theme} className={classNames(classes.wrapper, className)}>
                <div className={classes.toggle}>
                    <input
                        {...nativeProps}
                        id={id}
                        ref={ref}
                        type="color"
                        disabled={disabled}
                        defaultValue={displayValue}
                        className={classes.input}
                        onBlur={handleBlur}
                        onKeyUp={onKeyUp}
                        onKeyDown={onKeyDown}
                        onFocus={handleFocus}
                        onChange={handleChange}
                    />
                    <IconPalette className={classNames(classes.icon)} />
                </div>
                <label htmlFor={id} className={classes.label} ref={labelRef}>
                    {displayValue.toLowerCase() || placeholder}
                </label>
            </LocalRoot>
        );
    }
);

InputColor.displayName = 'InputColor';
