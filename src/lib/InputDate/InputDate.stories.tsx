import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';
import type {ChangeEvent} from 'react';
import {useState, useCallback} from 'react';

import {validationControlDate} from '@/internal/inputs/storybook/validationControl.ts';

import {InputDate} from './InputDate.tsx';

const meta = {
    title: 'Inputs/Date',
    component: InputDate,
    parameters: {
        layout: 'centered',
    },
    args: {
        onClick: fn(),
        onBlur: fn(),
        onFocus: fn(),
        onKeyDown: fn(),
        onKeyUp: fn(),
        required: false,
        placeholder: 'YYYY-MM-DD',
        disabled: false,
        readOnly: false,
        errorMessage: 'External validation error',
    },
    argTypes: {
        value: {
            table: {
                disable: true,
            },
        },
        defaultValue: {control: 'text'},
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
        validation: validationControlDate,
    },
} as Meta<typeof InputDate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    name: 'Non-controlled',
    render: args => {
        return <InputDate {...args} />;
    },
    args: {
        defaultValue: '2018-07-22',
        min: '2018-01-01',
        max: '2018-12-31',
    },
};

export const ControlledState: Story = {
    name: 'Controlled',
    render: args => {
        const [value, setValue] = useState('2018-07-22');
        const handleChange = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                console.log('Value captured:', event.target.value);
                setValue(event.target.value);
            },
            [setValue]
        );
        return <InputDate {...args} value={value} onChange={handleChange} />;
    },
};

ControlledState.args = {
    min: '2018-01-01',
    max: '2018-12-31',
};

ControlledState.argTypes = {};

ControlledState.parameters = {
    docs: {
        source: {
            language: 'tsx',
            type: 'code',
        },
    },
};
