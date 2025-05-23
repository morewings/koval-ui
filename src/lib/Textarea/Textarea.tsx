import type {ChangeEvent, FC, TextareaHTMLAttributes} from 'react';
import {forwardRef, useCallback, useMemo} from 'react';
import classNames from 'classnames';
import {useLocalTheme} from 'css-vars-hook';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import type {NativePropsTextual, CallbackPropsTextual, ValidationProps} from '@/internal/inputs';
import {useExternalValidation} from '@/internal/inputs';
import {useRevalidateOnFormChange} from '@/internal/inputs';
import {ValidationState, useValidationIcon, useValidation} from '@/internal/inputs';
import {useInternalId} from '@/internal/hooks/useInternalId.ts';
import {useInternalRef} from '@/internal/hooks/useInternalRef.ts';

import classes from './Textarea.module.css';

export type Props = DataAttributes &
    LibraryProps &
    Omit<NativePropsTextual, 'inputMode' | 'pattern' | 'size'> &
    CallbackPropsTextual<HTMLTextAreaElement> &
    ValidationProps & {
        prefix?: FC;
        /**
         * The visible width of the text control, in average character widths.
         * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#cols
         */
        cols?: TextareaHTMLAttributes<HTMLTextAreaElement>['cols'];
        /**
         * The number of visible text lines for the control.
         * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#rows
         */
        rows?: TextareaHTMLAttributes<HTMLTextAreaElement>['rows'];
        /**
         * Specifies whether the Textarea is subject to spell checking by the underlying browser/OS.
         * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#spellcheck
         */
        spellCheck?: TextareaHTMLAttributes<HTMLTextAreaElement>['spellCheck'];
        /**
         * Indicates how the control should wrap the value for form submission.
         * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#wrap
         */
        wrap?: TextareaHTMLAttributes<HTMLTextAreaElement>['wrap'];
        /**
         * Set Textarea resizing behavior.
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/resize
         */
        resize?: 'horizontal' | 'vertical' | 'both' | 'none';
    };

export const Textarea = forwardRef<HTMLTextAreaElement, Props>(
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
            id,
            readOnly,
            cols = 20,
            rows = 3,
            resize = 'both',
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
            Boolean(nativeProps.required) ||
            typeof nativeProps.maxLength === 'number' ||
            typeof nativeProps.minLength === 'number';

        const {validateTextual, validity, setValidity} = useValidation({validation, hasValidators});

        const inputRef = useInternalRef(ref);
        useRevalidateOnFormChange(inputRef, validateTextual, revalidateOnFormChange);
        useExternalValidation({errorMessage, inputRef, setValidity, validation});

        const ValidationIcon = useValidationIcon(validity);
        const handleChange = useCallback(
            (event: ChangeEvent<HTMLTextAreaElement>) => {
                onChange(event);
            },
            [onChange]
        );

        const handleInvalid = useCallback(() => {
            setValidity(ValidationState.error);
        }, [setValidity]);

        const handleInput = useCallback(
            (event: ChangeEvent<HTMLTextAreaElement>) => {
                validateTextual(event);
            },
            [validateTextual]
        );

        const handleSelect = useCallback(
            (event: ChangeEvent<HTMLTextAreaElement>) => {
                readOnly && event.target.select();
            },
            [readOnly]
        );

        const textareaId = useInternalId(id);

        const {LocalRoot} = useLocalTheme();

        const theme = useMemo(
            () => ({
                resize,
            }),
            [resize]
        );

        return (
            <LocalRoot theme={theme} className={classNames(classes.wrapper, className)}>
                {Prefix && (
                    <label className={classes.prefix} htmlFor={textareaId}>
                        <Prefix />
                    </label>
                )}
                <textarea
                    {...nativeProps}
                    cols={cols}
                    rows={rows}
                    readOnly={readOnly}
                    id={textareaId}
                    placeholder={placeholder}
                    className={classes.textarea}
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
                    onInput={handleInput}
                    onSelect={handleSelect}
                />
                {displayIcon && validity && <ValidationIcon className={classes.validation} />}
            </LocalRoot>
        );
    }
);

Textarea.displayName = 'Textarea';
