import type {FC, ComponentProps, ChangeEvent} from 'react';
import {useCallback} from 'react';

import {InputNumber} from '@/lib';

export type Props = Omit<ComponentProps<typeof InputNumber>, 'onChange'> & {
    onChange: (value: string) => void;
};

export const PercentageInput: FC<Props> = ({onChange = () => {}, value, ...restProps}) => {
    const handleChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            onChange(String(Number(event.target.value) / 100));
        },
        [onChange]
    );
    return (
        <InputNumber
            {...restProps}
            onChange={handleChange}
            value={Number(value) * 100}
            step={0.01}
        />
    );
};
