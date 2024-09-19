import type {FC, ChangeEvent} from 'react';
import {useMemo} from 'react';
import {useEffect} from 'react';
import {useCallback, useState} from 'react';

import {FormField, InputNumeric} from '@/lib';
import type {NumberProps} from '@/lib/Number';

import classes from './Dialog.module.css';
import type {ColumnFormatOptions, FilterValue, RangeFilterValue} from './../types.ts';

export type Props = {
    value: FilterValue;
    onChange: (value: FilterValue) => void;
    cellProps?: ColumnFormatOptions;
    step?: number;
};

export const NumberRangeField: FC<Props> = ({
    value: valueProp,
    onChange,
    cellProps,
    step: stepProp,
}) => {
    const [value, setValue] = useState(valueProp as RangeFilterValue);

    useEffect(() => {
        setValue(valueProp as RangeFilterValue);
    }, [valueProp]);

    const [from, to] = value as RangeFilterValue;
    const handleMinChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const nextValue = [Number(event.target.value), to];
            setValue(nextValue);
        },
        [to]
    );
    const handleMaxChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const nextValue = [from, Number(event.target.value)];
            setValue(nextValue);
        },
        [from]
    );

    const minimumFraction = (cellProps as NumberProps)?.digitsConfig?.fraction?.minimum;
    const maximumFraction = (cellProps as NumberProps)?.digitsConfig?.fraction?.maximum;

    const step = useMemo(() => {
        const stepFromFraction =
            (typeof maximumFraction === 'number' && Math.pow(10, -maximumFraction)) ||
            (typeof minimumFraction === 'number' && Math.pow(10, -minimumFraction)) ||
            1;
        return typeof stepProp === 'number' ? stepProp : stepFromFraction;
    }, [maximumFraction, minimumFraction, stepProp]);

    useEffect(() => {
        onChange(value);
    }, [onChange, value]);
    return (
        <div className={classes.numberRange}>
            <FormField className={classes.numberField} label="From:">
                <InputNumeric
                    mode="floating"
                    step={step}
                    value={from ?? ''}
                    onChange={handleMinChange}
                />
            </FormField>
            <FormField className={classes.numberField} label="To:">
                <InputNumeric
                    mode="floating"
                    step={step}
                    value={to || ''}
                    onChange={handleMaxChange}
                />
            </FormField>
        </div>
    );
};
