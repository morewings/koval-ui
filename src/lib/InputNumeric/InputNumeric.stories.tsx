import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';
import {type ChangeEvent, useCallback, useState} from 'react';

import {validationControlNumber} from '@/internal/inputs/storybook/validationControl.ts';

import {InputNumeric} from './InputNumeric.tsx';

const meta = {
    title: 'Inputs/Numeric',
    component: InputNumeric,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    args: {
        onBlur: fn(),
        onFocus: fn(),
        onKeyDown: fn(),
        onKeyUp: fn(),
        onChange: fn(),
        required: false,
        size: 12,
        min: -999,
        max: 999,
        step: 1,
        placeholder: 'Enter decimal',
        mode: 'natural',
    },
    argTypes: {
        value: {
            table: {
                disable: true,
            },
        },
        defaultValue: {
            table: {
                disable: true,
            },
        },
        onClick: {
            table: {
                disable: true,
            },
        },
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
        autoComplete: {
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
    },
} as Meta<typeof InputNumeric>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    name: 'Non-controlled',
    render: args => {
        return <InputNumeric {...args} />;
    },
    args: {},
};

export const Controlled: Story = {
    render: args => {
        const [value, setValue] = useState(args.value);
        const handleChange = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                setValue(event.target.value);
            },
            [setValue]
        );
        return <InputNumeric {...args} onChange={handleChange} value={value} />;
    },
    args: {
        step: 11,
    },
};
