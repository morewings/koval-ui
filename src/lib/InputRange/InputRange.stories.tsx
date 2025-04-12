import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';
import {type ChangeEvent, useCallback, useState} from 'react';

import {prefixControl} from '@/internal/inputs/storybook/prefixControl.ts';
import {validationControlNumber} from '@/internal/inputs/storybook/validationControl.ts';

import {InputRange} from './InputRange.tsx';

const meta = {
    title: 'Inputs/Range',
    component: InputRange,
    parameters: {
        layout: 'centered',
    },
    args: {
        onChange: fn(),
        onBlur: fn(),
        onFocus: fn(),
        onKeyDown: fn(),
        onKeyUp: fn(),
        required: false,
        min: 0,
        max: 100,
        bars: 3,
        step: 1,
        scaleUnit: 'F',
        disabled: false,
        displayScale: true,
    },
    argTypes: {
        value: {control: 'text'},
        defaultValue: {control: 'text'},
        onBlur: {
            table: {
                disable: true,
            },
        },
        onFocus: {
            table: {
                disable: true,
            },
        },
        onKeyDown: {
            table: {
                disable: true,
            },
        },
        onKeyUp: {
            table: {
                disable: true,
            },
        },
        id: {
            table: {
                disable: true,
            },
        },
        role: {
            table: {
                disable: true,
            },
        },
        className: {
            table: {
                disable: true,
            },
        },
        name: {
            table: {
                disable: true,
            },
        },
        autoFocus: {
            table: {
                disable: true,
            },
        },
        form: {
            table: {
                disable: true,
            },
        },
        onChange: {
            table: {
                disable: true,
            },
        },
        revalidateOnFormChange: {
            table: {
                disable: true,
            },
        },
        validation: validationControlNumber,
        prefix: prefixControl,
    },
} as Meta<typeof InputRange>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    name: 'Non-controlled',
    render: args => {
        return <InputRange {...args} />;
    },
    args: {
        defaultValue: 50,
    },
};

export const Controlled: Story = {
    render: args => {
        const [value, setValue] = useState('33');
        const handleChange = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                setValue(event.target.value);
            },
            [setValue]
        );
        return <InputRange {...args} onChange={handleChange} value={value} />;
    },
};

Controlled.args = {};

Controlled.argTypes = {
    defaultValue: {
        table: {
            disable: true,
        },
    },
    value: {
        table: {
            disable: true,
        },
    },
};

Controlled.parameters = {
    docs: {
        source: {
            language: 'tsx',
            type: 'code',
        },
    },
};
