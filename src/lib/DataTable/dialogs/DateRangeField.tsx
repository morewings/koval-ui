import type {FC, ChangeEvent} from 'react';
import {useEffect} from 'react';
import {useCallback, useState} from 'react';

import {FormField, InputDate} from '@/lib';

import classes from './Dialog.module.css';
import type {ColumnFormatOptions, FilterValue, DateRangeFilterValue} from './../types.ts';

export type Props = {
    value: FilterValue;
    onChange: (value: FilterValue) => void;
    cellProps?: ColumnFormatOptions;
};

export const DateRangeField: FC<Props> = ({value: valueProp, onChange}) => {
    const [value, setValue] = useState(valueProp as DateRangeFilterValue);

    useEffect(() => {
        setValue(valueProp as DateRangeFilterValue);
    }, [valueProp]);

    const [from, to] = value as DateRangeFilterValue;
    const handleMinChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const nextValue = [event.target.value, to];
            setValue(nextValue);
        },
        [to]
    );
    const handleMaxChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const nextValue = [from, event.target.value];
            setValue(nextValue);
        },
        [from]
    );

    useEffect(() => {
        onChange(value);
    }, [onChange, value]);
    return (
        <div className={classes.numberRange}>
            <FormField className={classes.numberField} label="From:">
                <InputDate value={from ?? ''} onChange={handleMinChange} />
            </FormField>
            <FormField className={classes.numberField} label="To:">
                <InputDate value={to || ''} onChange={handleMaxChange} />
            </FormField>
        </div>
    );
};
