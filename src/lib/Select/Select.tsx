import type {ChangeEvent, FC} from 'react';
import {forwardRef, useCallback} from 'react';
import classNames from 'classnames';

import {IconError, IconValid, IconLoader} from '@/internal/Icons';
import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import type {NativePropsTextual, CallbackPropsTextual, ValidationProps} from '@/internal/inputs';
import {ValidationState, defaultValidator, useValidation} from '@/internal/inputs';

import classes from './Select.module.css';

export type Props = DataAttributes &
    LibraryProps &
    NativePropsTextual &
    CallbackPropsTextual<HTMLSelectElement> &
    ValidationProps & {
        prefix?: FC;
    };

export const Select = forwardRef<HTMLSelectElement, Props>(
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
            (event: ChangeEvent<HTMLSelectElement>) => {
                onChange(event);
            },
            [onChange]
        );

        const handleInvalid = useCallback(() => {
            setValidity(ValidationState.error);
        }, [setValidity]);
        return (
            <div className={classNames(classes.wrapper, className)}>
                {Prefix && <Prefix />}
                <select
                    {...nativeProps}
                    placeholder={placeholder}
                    className={classes.select}
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
                    onInput={validateTextual}>
                    <option value="Option 1">Option 1</option>
                    <option value="Option 2">Option 2</option>
                    <option value="Option 3">Option 3</option>
                    <option value="Option 4">Option 4</option>
                    <option value="Option 5">Option 5</option>
                    <option value="Option length">Option that has too long of a value to fit</option>
                </select>
                {validity && <ValidationIcon />}
            </div>
        );
    }
);

Select.displayName = 'Select';
