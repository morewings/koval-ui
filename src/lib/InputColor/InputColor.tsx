import type {ChangeEvent, FocusEvent, InputHTMLAttributes} from 'react';
import {useMemo, useRef} from 'react';
import {forwardRef, useCallback} from 'react';
import classNames from 'classnames';
import {useLocalTheme} from 'css-vars-hook';

import {IconPalette} from '@/internal/Icons';
import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import type {
    CallbackPropsTextual,
    ValidationProps,
    NativePropsInteractive,
} from '@/internal/inputs';
import {useRevalidateOnFormChange} from '@/internal/inputs';
import {useExternalValidation, useValidation, useValidationIcon} from '@/internal/inputs';
import {useInternalId} from '@/internal/hooks/useInternalId.ts';
import {useInternalRef} from '@/internal/hooks/useInternalRef.ts';

import classes from './InputColor.module.css';
import {invertColor} from './invertColor.ts';

export type Props = DataAttributes &
    LibraryProps &
    NativePropsInteractive &
    CallbackPropsTextual &
    ValidationProps & {
        /**
         * Set text for placeholder.
         * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#placeholder
         */
        placeholder?: InputHTMLAttributes<HTMLInputElement>['placeholder'];
        /**
         * Provide a list if predefined colors to show in a browser-provided interface. Colors have to be in HEX format #000000.
         * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist#color_type
         */
        predefinedColors?: string[];
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
            predefinedColors = [],
            errorMessage,
            revalidateOnFormChange,
            validation,
            ...nativeProps
        },
        ref
    ) => {
        const {validity, setValidity, validateTextual} = useValidation({
            validation,
        });
        const id = useInternalId(idProp);

        const inputRef = useInternalRef(ref);
        useExternalValidation({errorMessage, inputRef, setValidity, validation});

        useRevalidateOnFormChange(inputRef, validateTextual, revalidateOnFormChange);

        const ValidationIcon = useValidationIcon(validity);

        const {LocalRoot, setTheme} = useLocalTheme();
        const displayValue = (value ?? defaultValue) as string;
        const theme = useMemo(
            () => ({
                'selected-color': displayValue,
                'inverted-color': invertColor(displayValue, true),
            }),
            [displayValue]
        );

        const handleFocus = useCallback(
            (event: FocusEvent<HTMLInputElement>) => {
                onFocus(event);
                setTheme({
                    'selected-color': event.target.value,
                    'inverted-color': invertColor(event.target.value, true),
                });
            },
            [onFocus, setTheme]
        );

        const labelRef = useRef<HTMLLabelElement>(null);

        const handleBlur = useCallback(
            (event: FocusEvent<HTMLInputElement>) => {
                setTheme({
                    'inverted-color': invertColor(event.target.value, true),
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
                    'selected-color': event.target.value,
                    'inverted-color': 'transparent',
                });
            },
            [setTheme]
        );

        const hasPredefinedColors = predefinedColors.length > 0;
        const predefinedColorsListId = `${id}_predefinedColors`;

        return (
            <LocalRoot theme={theme} className={classNames(classes.wrapper, className)}>
                <div className={classes.toggle}>
                    <input
                        {...nativeProps}
                        id={id}
                        ref={inputRef}
                        type="color"
                        disabled={disabled}
                        defaultValue={displayValue}
                        className={classes.input}
                        onBlur={handleBlur}
                        onKeyUp={onKeyUp}
                        onKeyDown={onKeyDown}
                        onFocus={handleFocus}
                        onChange={handleChange}
                        list={hasPredefinedColors ? predefinedColorsListId : undefined}
                    />
                    <IconPalette className={classNames(classes.icon)} />
                </div>
                <label htmlFor={id} className={classes.label} ref={labelRef}>
                    {displayValue.toLowerCase() || placeholder}
                </label>
                {validity && <ValidationIcon />}
                {hasPredefinedColors && (
                    <datalist id={predefinedColorsListId}>
                        {predefinedColors.map(color => {
                            return <option key={color} value={color} />;
                        })}
                    </datalist>
                )}
            </LocalRoot>
        );
    }
);

InputColor.displayName = 'InputColor';
