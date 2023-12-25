import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';
import {type ChangeEvent, useCallback, useState} from 'react';

import {validatorAsync, validatorSync} from '@/internal/inputs';
import {CloudUpload} from '@/internal/Icons';

import {Textarea} from './Textarea.tsx';

const meta = {
    title: 'Inputs/Textarea',
    component: Textarea,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    args: {
        onBlur: fn(),
        onFocus: fn(),
        onKeyDown: fn(),
        onKeyUp: fn(),
        required: false,
        placeholder: '',
        readOnly: false,
        disabled: false,
        rows: 3,
        cols: 20,
    },
    argTypes: {
        value: {control: 'text'},
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
        validatorFn: {
            options: ['noValidator', 'syncValidator', 'asyncValidator'], // An array of serializable values
            mapping: {
                noValidator: undefined,
                syncValidator: validatorSync,
                asyncValidator: validatorAsync,
            }, // Maps serializable option values to complex arg values
            control: {
                type: 'radio', // Type 'select' is automatically inferred when 'options' is defined
                labels: {
                    // 'labels' maps option values to string labels
                    noValidator: 'No custom validator',
                    syncValidator: 'Sync validator (value.length < 4)',
                    asyncValidator: 'Async validator (value.length < 4)',
                },
            },
        },
        prefix: {
            options: ['noPrefix', 'withPrefix'],
            mapping: {
                noPrefix: undefined,
                withPrefix: CloudUpload,
            },
            control: {
                type: 'radio',
                labels: {
                    // 'labels' maps option values to string labels
                    noPrefix: 'No prefix',
                    withPrefix: 'With prefix',
                },
            },
        },
    },
} as Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render: args => {
        return <Textarea {...args} />;
    },
    args: {
        placeholder: 'This is Textarea',
    },
};

export const ControlledState: Story = {
    render: args => {
        const [value, setValue] = useState(args.value);
        const handleChange = useCallback(
            (event: ChangeEvent<HTMLTextAreaElement>) => {
                console.log('Value captured:', event.target.value);
                setValue(event.target.value);
            },
            [setValue]
        );
        return <Textarea {...args} value={value} onChange={handleChange} />;
    },
};

ControlledState.args = {
    value: 'Controlled value',
};

ControlledState.argTypes = {
    defaultValue: {
        table: {
            disable: true,
        },
    },
};

ControlledState.parameters = {
    docs: {
        source: {
            language: 'tsx',
            type: 'code',
        },
    },
};
