import type {ChangeEvent} from 'react';
import {forwardRef, useCallback} from 'react';
import classNames from 'classnames';

import type {
    NativePropsInteractive,
    CallbackPropsInteractive,
    ValidationProps,
} from '@/internal/inputs';
import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import {useInternalId} from '@/internal/hooks/useInternalId.ts';

import classes from './InputRadio.module.css';

export type Props = DataAttributes &
    LibraryProps &
    NativePropsInteractive &
    CallbackPropsInteractive &
    Omit<ValidationProps, 'validatorFn'> & {
        label?: string;
    };

export const InputRadio = forwardRef<HTMLInputElement, Props>(
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
            ...nativeProps
        },
        ref
    ) => {
        const id = useInternalId(idProp);

        const handleChange = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                onChange(event);
            },
            [onChange]
        );
        return (
            <div className={classNames(classes.wrapper, className)}>
                <input
                    {...nativeProps}
                    className={classes.input}
                    ref={ref}
                    disabled={disabled}
                    type="radio"
                    id={id}
                    value={value}
                    checked={checked}
                    defaultChecked={defaultChecked}
                    onChange={handleChange}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onKeyUp={onKeyUp}
                    onKeyDown={onKeyDown}
                    required={required}
                />
                <label
                    className={classNames(classes.label, {[classes.required]: required})}
                    htmlFor={id}>
                    {label}
                </label>
            </div>
        );
    }
);

InputRadio.displayName = 'InputRadio';
