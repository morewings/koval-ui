import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';
import {type ChangeEvent, useCallback, useState} from 'react';

import {validationControlNumber} from '@/internal/inputs/storybook/validationControl.ts';

import {InputNumber} from './InputNumber.tsx';

const meta = {
    title: 'Inputs/Number',
    component: InputNumber,
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
        readOnly: false,
        disabled: false,
        size: 9,
    },
    argTypes: {
        value: {control: 'text'},
        step: {control: 'number'},
        min: {control: 'number'},
        max: {control: 'number'},
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
} as Meta<typeof InputNumber>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    name: 'Non-controlled',
    render: args => {
        return <InputNumber {...args} />;
    },
    args: {},
};

export const Controlled: Story = {
    render: args => {
        const [value, setValue] = useState<string | number>(33);
        const handleChange = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                setValue(event.target.value);
            },
            [setValue]
        );
        return <InputNumber {...args} onChange={handleChange} value={value} />;
    },
    args: {
        step: 11,
    },
    argTypes: {
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
    },
};
