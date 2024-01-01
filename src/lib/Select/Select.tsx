import type {ChangeEvent, FC, SelectHTMLAttributes, FocusEvent, ReactNode} from 'react';
import {forwardRef, useCallback, useState} from 'react';
import classNames from 'classnames';

import {IconError, IconValid, IconLoader, IconExpand, IconCollapse} from '@/internal/Icons';
import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import type {NativePropsInteractive, CallbackPropsTextual, ValidationProps} from '@/internal/inputs';
import {ValidationState, defaultValidator, useValidation} from '@/internal/inputs';
import {useInternalId} from '@/internal/hooks/useInternalId.ts';
import {useInternalRef} from '@/internal/hooks/useInternalRef.ts';

import classes from './Select.module.css';

enum DropdownState {
    open = 'open',
    close = 'close',
}

export type Props = DataAttributes &
    LibraryProps &
    NativePropsInteractive &
    CallbackPropsTextual<HTMLSelectElement> &
    ValidationProps & {
        children?: ReactNode;
        prefix?: FC;
        multiple?: SelectHTMLAttributes<HTMLSelectElement>['multiple'];
    };

export const Select = forwardRef<HTMLSelectElement, Props>(
    (
        {
            prefix: Prefix,
            className,
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
            children,
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

        const [dropdownState, setDropdownState] = useState<keyof typeof DropdownState>('close');

        const Icon = {
            [DropdownState.close]: IconCollapse,
            [DropdownState.open]: IconExpand,
        }[dropdownState];

        const handleFocus = useCallback(
            (event: FocusEvent<HTMLSelectElement>) => {
                onFocus(event);
                setDropdownState(DropdownState.close);
            },
            [onFocus, setDropdownState]
        );

        const handleBlur = useCallback(
            (event: FocusEvent<HTMLSelectElement>) => {
                onBlur(event);
                setDropdownState(DropdownState.open);
            },
            [onBlur, setDropdownState]
        );

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
                        className={classes.select}
                        ref={inputRef}
                        disabled={disabled}
                        value={value}
                        defaultValue={defaultValue}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onFocus={handleFocus}
                        onKeyUp={onKeyUp}
                        onKeyDown={onKeyDown}
                        onInvalid={handleInvalid}
                        onInput={validateTextual}>
                        {children}
                    </select>
                    {!multiple && <Icon className={classes.icon} />}
                </div>
                {validity && <ValidationIcon className={classes.validation} />}
            </div>
        );
    }
);

Select.displayName = 'Select';
