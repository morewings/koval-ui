import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';
import {type ChangeEvent, useCallback, useState} from 'react';

import {ValidationState} from '@/internal/inputs';

import {InputColor} from './InputColor.tsx';

const meta = {
    title: 'Inputs/Color',
    component: InputColor,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    args: {
        onClick: fn(),
        onBlur: fn(),
        onFocus: fn(),
        onKeyDown: fn(),
        onKeyUp: fn(),
        required: false,
        placeholder: '#000000',
        disabled: false,
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
        prefix: {
            table: {
                disable: true,
            },
        },
        predefinedColors: {
            options: ['noColors', 'withColors'],
            mapping: {
                noColors: undefined,
                withColors: ['#800000', '#8B0000', '#A52A2A', '#DC143C'],
            },
            control: {
                type: 'radio',
                labels: {
                    noColors: 'No predefined colors',
                    withColors: 'With predefined colors',
                },
            },
        },
        validation: {
            // TODO: add function validation example
            options: ['error', 'valid', 'inProgress', 'pristine'],
            mapping: {
                error: ValidationState.error,
                valid: ValidationState.valid,
                inProgress: ValidationState.inProgress,
                pristine: ValidationState.pristine,
            },
            control: {
                type: 'radio',
                labels: {
                    error: 'External validation: "error"',
                    valid: 'External validation: "valid"',
                    inProgress: 'External validation: "inProgress"',
                    pristine: 'External validation: "pristine"',
                },
            },
        },
    },
} as Meta<typeof InputColor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    name: 'Non-controlled',
    render: args => {
        return <InputColor {...args} />;
    },
    args: {
        defaultValue: '#CCCCCC',
    },
};

export const ControlledState: Story = {
    name: 'Controlled',
    render: args => {
        const [value, setValue] = useState('#CCCCCC');
        const handleChange = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                console.log('Value captured:', event.target.value);
                setValue(event.target.value);
            },
            [setValue]
        );
        return <InputColor {...args} value={value} onChange={handleChange} />;
    },
};

ControlledState.args = {};

ControlledState.argTypes = {};

ControlledState.parameters = {
    docs: {
        source: {
            language: 'tsx',
            type: 'code',
        },
    },
};
