import type {ChangeEvent, FC, SVGProps} from 'react';
import {useMemo} from 'react';
import {forwardRef, useCallback} from 'react';
import classNames from 'classnames';
import {useLocalTheme} from 'css-vars-hook';

import {IconError, IconValid, IconLoader} from '@/internal/Icons';
import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import type {NativePropsNumeric, CallbackPropsTextual, ValidationProps} from '@/internal/inputs';
import {ValidationState, defaultValidator, useValidation} from '@/internal/inputs';
import {useControllableState} from '@/internal/hooks/useControllableState.ts';
import {useInternalId} from '@/internal/hooks/useInternalId.ts';

import classes from './InputRange.module.css';

export type Props = DataAttributes &
    LibraryProps &
    Omit<NativePropsNumeric, 'size'> &
    CallbackPropsTextual &
    ValidationProps & {
        prefix?: FC<{className?: string} & SVGProps<SVGSVGElement> & unknown>;
        bars?: number;
        scaleUnit?: string;
    };

const createOptions = ({
    min,
    max,
    bars,
    scaleUnit,
}: {
    min: number;
    max: number;
    bars: number;
    scaleUnit?: string;
}) => {
    const total = max - min;
    const singleBar = total / bars;
    const scale = new Array(bars + 1).fill('');
    return scale.map((_, i) => {
        const value = Math.floor(min + singleBar * i);
        return (
            <option
                value={value}
                label={`- ${value}${scaleUnit}`}
                className={classes.mark}
                key={i}></option>
        );
    });
};

export const InputRange = forwardRef<HTMLInputElement, Props>(
    (
        {
            prefix: Prefix,
            id,
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
            min = 0,
            max = 100,
            bars = 5,
            scaleUnit = '',
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

        const [displayValue, setDisplayValue] = useControllableState({
            value,
            defaultValue,
        });

        const handleChange = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                setDisplayValue(event.target.value);
                onChange(event);
            },
            [onChange, setDisplayValue]
        );

        const handleInvalid = useCallback(() => {
            setValidity(ValidationState.error);
        }, [setValidity]);

        const inputId = useInternalId(id);
        const scaleId = `${inputId}-scale`;

        const {LocalRoot} = useLocalTheme();

        const theme = useMemo(
            () => ({
                outputLength: max.toString().length + scaleUnit.length,
            }),
            [max, scaleUnit]
        );

        return (
            <div className={classNames(classes['input-range'], className)}>
                {Prefix && (
                    <label className={classes.prefix} htmlFor={inputId}>
                        <Prefix />
                    </label>
                )}
                <div className={classes['scale-wrapper']}>
                    <input
                        {...nativeProps}
                        id={inputId}
                        type="range"
                        className={classes.input}
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
                        onInput={validateTextual}
                        list={scaleId}
                        min={min}
                        max={max}
                    />
                    <datalist id={scaleId} className={classes.scale}>
                        {createOptions({min: Number(min), max: Number(max), bars, scaleUnit})}
                    </datalist>
                </div>
                {/* TODO: add htmlFor when CSS vars hook supports it */}
                <LocalRoot as="output" theme={theme} className={classes.output}>
                    {displayValue || Number(max) / 2} {scaleUnit}
                </LocalRoot>
                {validity && <ValidationIcon className={classes.validation} />}
            </div>
        );
    }
);

InputRange.displayName = 'InputRange';
