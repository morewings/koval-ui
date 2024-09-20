import type {FC, ChangeEvent} from 'react';
import {useEffect} from 'react';
import {useCallback, useState} from 'react';

import {FormField, InputNumeric} from '@/lib';

import classes from './Dialog.module.css';
import type {ColumnFormatOptions, FilterValue} from './../types.ts';

export type Props = {
    value: FilterValue;
    onChange: (value: FilterValue) => void;
    cellProps?: ColumnFormatOptions;
    step?: number;
};

const normalizeValue = (value: FilterValue) => {
    if (!Array.isArray(value)) {
        return ['', ''];
    } else {
        return value.map(filter => String(filter));
    }
};

const valueToNumber = (value: string[]) => {
    return value.map(filter => Number(filter));
};

export const NumberRangeField: FC<Props> = ({value: valueProp, onChange}) => {
    const [value, setValue] = useState(normalizeValue(valueProp));

    const [from, to] = value;

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
        onChange(valueToNumber(value));
    }, [onChange, value]);
    return (
        <div className={classes.numberRange}>
            <FormField className={classes.numberField} label="From:">
                <InputNumeric mode="floating" value={from} onChange={handleMinChange} />
            </FormField>
            <FormField className={classes.numberField} label="To:">
                <InputNumeric mode="floating" value={to} onChange={handleMaxChange} />
            </FormField>
        </div>
    );
};
