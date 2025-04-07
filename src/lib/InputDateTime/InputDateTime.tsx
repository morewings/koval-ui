import type {ChangeEvent, FC} from 'react';
import {forwardRef, useCallback, Fragment, useEffect, useState} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import type {NativePropsTextual, CallbackPropsTextual, ValidationProps} from '@/internal/inputs';
import {
    useRevalidateOnFormChange,
    useExternalValidation,
    ValidationState,
    useValidation,
} from '@/internal/inputs';
import {useInternalRef} from '@/internal/hooks/useInternalRef.ts';
import {InputDate, InputTime} from '@/lib';

import classes from './InputDateTime.module.css';

export type Props = DataAttributes &
    LibraryProps &
    Omit<NativePropsTextual, 'maxLength' | 'minLength' | 'autoComplete' | 'inputMode' | 'pattern'> &
    Omit<CallbackPropsTextual, 'defaultValue'> &
    ValidationProps & {
        prefix?: FC;
    };

const noOp = () => {};

export const InputDateTime = forwardRef<HTMLInputElement, Props>(
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
            // TODO: enable controlled/non-controlled mode
            // defaultValue,
            validation,
            errorMessage,
            revalidateOnFormChange,
            ...nativeProps
        },
        ref
    ) => {
        const inputRef = useInternalRef(ref);

        const hasValidators = Boolean(validation);

        const {validateTextual, validity, setValidity} = useValidation({validation, hasValidators});

        useRevalidateOnFormChange(inputRef, validateTextual, revalidateOnFormChange);
        useExternalValidation({errorMessage, inputRef, setValidity, validation});

        const handleInvalid = useCallback(() => {
            setValidity(ValidationState.error);
        }, [setValidity]);

        const [date, setDate] = useState('');
        const [time, setTime] = useState('00:00');
        const [combined, setCombined] = useState(value || 'T00:00');

        useEffect(() => {
            setCombined(value || 'T00:00');
            if (value !== undefined && value !== 'T00:00') {
                const [nextDate, nextTime] = (value as string).split('T');
                setDate(nextDate);
                setTime(nextTime);
            } else {
                setDate('');
                setTime('00:00');
            }
        }, [value]);

        const handleSetDate = useCallback((event: ChangeEvent<HTMLInputElement>) => {
            setDate(event.target.value);
        }, []);

        const handleSetTime = useCallback((event: ChangeEvent<HTMLInputElement>) => {
            setTime(event.target.value);
        }, []);

        useEffect(() => {
            setCombined(`${date}T${time}`);
        }, [date, time]);

        useEffect(() => {
            inputRef.current?.dispatchEvent(new Event('change', {bubbles: true}));
        }, [combined, inputRef]);

        useEffect(() => {
            inputRef.current?.addEventListener('change', event => {
                // TODO: improve type
                validateTextual(event as unknown as ChangeEvent<HTMLInputElement>);
                onChange(event as unknown as ChangeEvent<HTMLInputElement>);
            });
        }, [inputRef, onChange, validateTextual]);

        return (
            <Fragment>
                <div className={classNames(classes.wrapper, className)}>
                    <input
                        {...nativeProps}
                        type="text"
                        placeholder={placeholder}
                        className={classes.inputMarionette}
                        ref={inputRef}
                        disabled={disabled}
                        value={combined}
                        onChange={noOp}
                        onBlur={onBlur}
                        onFocus={onFocus}
                        onKeyUp={onKeyUp}
                        onKeyDown={onKeyDown}
                        onInvalid={handleInvalid}
                    />
                    <InputDate
                        value={date}
                        onChange={handleSetDate}
                        validation={validity}
                        displayIcon={false}
                    />
                    <InputTime value={time} onChange={handleSetTime} validation={validity} />
                </div>
            </Fragment>
        );
    }
);

InputDateTime.displayName = 'InputDateTime';
