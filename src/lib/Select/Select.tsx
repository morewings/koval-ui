import type {ChangeEvent, FC, SelectHTMLAttributes, ReactNode} from 'react';
import {forwardRef, useCallback, useMemo} from 'react';
import classNames from 'classnames';
import {useLocalTheme} from 'css-vars-hook';

import {IconExpand} from '@/internal/Icons';
import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import type {
    NativePropsInteractive,
    CallbackPropsTextual,
    ValidationProps,
} from '@/internal/inputs';
import {useExternalValidation} from '@/internal/inputs';
import {useRevalidateOnFormChange} from '@/internal/inputs';
import {ValidationState, useValidationIcon, useValidation} from '@/internal/inputs';
import {useInternalId} from '@/internal/hooks/useInternalId.ts';
import {useInternalRef} from '@/internal/hooks/useInternalRef.ts';

import classes from './Select.module.css';

export type Props = DataAttributes &
    LibraryProps &
    NativePropsInteractive &
    Omit<CallbackPropsTextual<HTMLSelectElement>, 'defaultValue'> &
    ValidationProps & {
        children?: ReactNode;
        prefix?: FC;
        multiple?: SelectHTMLAttributes<HTMLSelectElement>['multiple'];
        /**
         * Define the width of the input in characters
         */
        size?: SelectHTMLAttributes<HTMLSelectElement>['size'];
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
            id,
            multiple,
            children,
            size = 16,
            revalidateOnFormChange,
            validation,
            errorMessage,
            ...nativeProps
        },
        ref
    ) => {
        const {LocalRoot} = useLocalTheme();
        const theme = useMemo(
            () => ({
                'select-width': `${size}ch`,
            }),
            [size]
        );

        const hasValidators = Boolean(validation);

        const {validateTextual, validity, setValidity} = useValidation({validation, hasValidators});

        const inputRef = useInternalRef(ref);
        useRevalidateOnFormChange(inputRef, validateTextual, revalidateOnFormChange);
        useExternalValidation({errorMessage, inputRef, setValidity, validation});

        const ValidationIcon = useValidationIcon(validity);
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

        return (
            <LocalRoot theme={theme} className={classNames(classes.wrapper, className)}>
                {Prefix && (
                    <label className={classes.prefix} htmlFor={selectId}>
                        <Prefix />
                    </label>
                )}
                <div className={classes.iconWrapper}>
                    <select
                        {...nativeProps}
                        id={selectId}
                        multiple={multiple}
                        className={classes.select}
                        ref={inputRef}
                        disabled={disabled}
                        value={value}
                        onChange={handleChange}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onKeyUp={onKeyUp}
                        onKeyDown={onKeyDown}
                        onInvalid={handleInvalid}
                        onInput={validateTextual}>
                        {children}
                    </select>
                    {!multiple && <IconExpand className={classes.icon} />}
                </div>
                {validity && <ValidationIcon className={classes.validation} />}
            </LocalRoot>
        );
    }
);

Select.displayName = 'Select';
