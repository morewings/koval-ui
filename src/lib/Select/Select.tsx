import type {ChangeEvent, FC, SelectHTMLAttributes} from 'react';
import {forwardRef, useCallback} from 'react';
import classNames from 'classnames';

import {IconError, IconValid, IconLoader, IconExpand} from '@/internal/Icons';
import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import type {NativePropsTextual, CallbackPropsTextual, ValidationProps} from '@/internal/inputs';
import {ValidationState, defaultValidator, useValidation} from '@/internal/inputs';
import {useInternalId} from '@/internal/hooks/useInternalId.ts';
import {useInternalRef} from '@/internal/hooks/useInternalRef.ts';

import classes from './Select.module.css';

export type Props = DataAttributes &
    LibraryProps &
    Omit<NativePropsTextual, 'readOnly'> &
    CallbackPropsTextual<HTMLSelectElement> &
    ValidationProps & {
        prefix?: FC;
        multiple?: SelectHTMLAttributes<HTMLSelectElement>['multiple'];
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
            id,
            multiple,
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

        const selectId = useInternalId(id);

        const inputRef = useInternalRef(ref);

        return (
            <div className={classNames(classes.wrapper, className)}>
                {Prefix && (
                    <label className={classes.prefix} htmlFor={selectId}>
                        <Prefix />
                    </label>
                )}
                <div className={classes['icon-wrapper']}>
                    <select
                        {...nativeProps}
                        id={selectId}
                        multiple={multiple}
                        placeholder={placeholder}
                        className={classes.select}
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
                        onInput={validateTextual}>
                        <option value="Option 1">Option 1</option>
                        <option value="Option 2">Option 2</option>
                        <option value="Option 3">Option 3</option>
                        <option value="Option 4">Option 4</option>
                        <option value="Option 5">Option 5</option>
                        <option value="Option long">Option that has too long of a value to fit</option>
                    </select>
                    {!multiple && <IconExpand className={classes.icon} />}
                </div>
                {validity && <ValidationIcon className={classes.validation} />}
            </div>
        );
    }
);

Select.displayName = 'Select';
