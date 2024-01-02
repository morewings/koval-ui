import type {ChangeEvent, FC, TextareaHTMLAttributes} from 'react';
import {forwardRef, useCallback, useMemo} from 'react';
import classNames from 'classnames';
import {useLocalTheme} from 'css-vars-hook';

import {IconError, IconValid, IconLoader} from '@/internal/Icons';
import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import type {NativePropsTextual, CallbackPropsTextual, ValidationProps} from '@/internal/inputs';
import {ValidationState, defaultValidator, useValidation} from '@/internal/inputs';
import {useInternalId} from '@/internal/hooks/useInternalId.ts';

import classes from './Textarea.module.css';

export type Props = DataAttributes &
    LibraryProps &
    Omit<NativePropsTextual, 'inputMode' | 'pattern'> &
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
            validatorFn = defaultValidator,
            id,
            readOnly,
            cols = 20,
            rows = 3,
            resize = 'both',
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

        /* Required to save focus when validation changes*/
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
        const LocalRootMemoized = useMemo(() => LocalRoot, []);

        return (
            <LocalRootMemoized theme={theme} className={classNames(classes.wrapper, className)}>
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
                    ref={ref}
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
                {validity && <ValidationIcon />}
            </LocalRootMemoized>
        );
    }
);

Textarea.displayName = 'Textarea';
