import type {FC, ChangeEvent, InputHTMLAttributes} from 'react';
import {useCallback} from 'react';
import classNames from 'classnames';

import {FormField} from '@/lib/FormField';
import {InputText} from '@/lib/InputText';

import classes from './Dialog.module.css';
import type {FilterValue} from './../types.ts';

export type Props = {
    value: FilterValue;
    onChange: (value: FilterValue) => void;
};

export const TextField: FC<Props> = ({value, onChange}) => {
    const handleFilterChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            onChange(event.target.value);
        },
        [onChange]
    );
    return (
        <FormField className={classNames(classes.field, classes.valueField)} label="Filter value:">
            <InputText
                value={value as InputHTMLAttributes<HTMLInputElement>['value']}
                onChange={handleFilterChange}
            />
        </FormField>
    );
};
