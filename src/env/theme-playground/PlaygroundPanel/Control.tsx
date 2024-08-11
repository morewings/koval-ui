import type {FC} from 'react';
// @ts-expect-error TODO: maybe fix later
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {useState, useEffect, useCallback} from 'react';
import {styled} from '@storybook/theming';
import {ColorControl} from '@storybook/blocks';

export type Props = {
    onChange: (name: string, value?: string) => void;
    value?: string;
    name: string;
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    text-align: left;
    flex-shrink: 1;
    align-items: center;
    gap: 12px;
    & input {
        width: 210px;
    }
`;

const Label = styled.label`
    font-weight: bold;
    font-size: 14px;
`;

export const Control: FC<Props> = ({onChange, value: valueProp, name}) => {
    const [value, setValue] = useState<string | undefined>(valueProp);
    useEffect(() => {
        setValue(valueProp);
    }, [valueProp]);
    const handleChange = useCallback(
        (value?: string) => {
            setValue(value);
            onChange(name, value);
        },
        [name, onChange]
    );
    return (
        <Wrapper>
            <Label htmlFor="foo" style={{color: value}}>
                {name.replace('color', '')}:
            </Label>
            <ColorControl value={value} name={name} onChange={handleChange} />
        </Wrapper>
    );
};
