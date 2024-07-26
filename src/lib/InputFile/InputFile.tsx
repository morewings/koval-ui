import type {ChangeEvent, InputHTMLAttributes} from 'react';
import {useMemo} from 'react';
import {useState} from 'react';
import {forwardRef, useCallback} from 'react';
import classNames from 'classnames';
import {useLocalTheme} from 'css-vars-hook';

import {IconError, IconValid, IconLoader, IconFile} from '@/internal/Icons';
import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import type {NativePropsTextual, CallbackPropsTextual, ValidationProps} from '@/internal/inputs';
import {
    useRevalidateOnFormChange,
    useExternalValidation,
    defaultValidator,
    ValidationState,
    useValidation,
} from '@/internal/inputs';
import {useInternalId} from '@/internal/hooks/useInternalId.ts';
import {useInternalRef} from '@/internal/hooks/useInternalRef.ts';

import classes from './InputFile.module.css';

export type Props = DataAttributes &
    LibraryProps &
    Omit<NativePropsTextual, 'inputMode' | 'maxLength' | 'minLength' | 'pattern' | 'readOnly'> &
    ValidationProps &
    CallbackPropsTextual & {
        accept?: InputHTMLAttributes<HTMLInputElement>['accept'];
        multiple?: InputHTMLAttributes<HTMLInputElement>['multiple'];
    };

export const InputFile = forwardRef<HTMLInputElement, Props>(
    (
        {
            id: idProp,
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
            size = 16,
            validationState,
            errorMessage,
            revalidateOnFormChange,
            validatorFn = defaultValidator,
            ...nativeProps
        },
        ref
    ) => {
        const {LocalRoot} = useLocalTheme();
        const theme = useMemo(
            () => ({
                'input-width': `${size}ch`,
            }),
            [size]
        );

        const id = useInternalId(idProp);
        const [filename, setFileName] = useState('');
        const {validateTextual, validity, setValidity} = useValidation({
            validatorFn,
        });
        const inputRef = useInternalRef(ref);
        useExternalValidation({inputRef, setValidity, validationState, errorMessage});
        useRevalidateOnFormChange(inputRef, validateTextual, revalidateOnFormChange);

        const ValidationIcon = {
            [ValidationState.error]: IconError,
            [ValidationState.valid]: IconValid,
            [ValidationState.inProgress]: IconLoader,
        }[validity!];
        const handleChange = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                onChange(event);
                setFileName(event.target.files![0].name);
            },
            [onChange, setFileName]
        );

        const handleInvalid = useCallback(() => {
            setFileName('');
            setValidity(ValidationState.error);
        }, [setValidity]);
        return (
            <LocalRoot theme={theme} className={classNames(classes['input-file'], className)}>
                <div className={classes.toggle}>
                    <input
                        {...nativeProps}
                        id={id}
                        type="file"
                        placeholder={placeholder}
                        className={classes.input}
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
                        onInput={validateTextual}
                    />
                    <IconFile className={classNames(classes.icon)} />
                </div>
                <label htmlFor={id} className={classes.label}>
                    {filename || placeholder}
                </label>
                {validity && <ValidationIcon className={classes.validity} />}
            </LocalRoot>
        );
    }
);

InputFile.displayName = 'InputFile';
