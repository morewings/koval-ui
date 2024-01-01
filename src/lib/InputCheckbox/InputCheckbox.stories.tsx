import type {ChangeEvent} from 'react';
import {useState, useCallback} from 'react';
import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';

import {validatorAsyncBoolean, validatorSyncBoolean} from '@/internal/inputs';

import {InputCheckbox} from './InputCheckbox.tsx';

const meta = {
    title: 'Inputs/Checkbox',
    component: InputCheckbox,
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
        value: '',
        disabled: false,
        required: false,
    },
    argTypes: {
        value: {control: 'text'},
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
        autoComplete: {
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
                syncValidator: validatorSyncBoolean,
                asyncValidator: validatorAsyncBoolean,
            }, // Maps serializable option values to complex arg values
            control: {
                type: 'radio', // Type 'select' is automatically inferred when 'options' is defined
                labels: {
                    // 'labels' maps option values to string labels
                    noValidator: 'No custom validator',
                    syncValidator: 'Sync validator (value !== true)',
                    asyncValidator: 'Async validator (value !== true)',
                },
            },
        },
    },
} as Meta<typeof InputCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        label: 'bar',
        id: 'foo',
        defaultChecked: false,
        value: 'foo',
    },
    argTypes: {
        checked: {
            table: {
                disable: true,
            },
        },
        defaultChecked: {
            table: {
                disable: true,
            },
        },
    },
};

export const Controlled: Story = {
    render: args => {
        const [checked, setChecked] = useState(false);
        const handleChange = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                setChecked(event.target.checked);
            },
            [setChecked]
        );
        return <InputCheckbox {...args} onChange={handleChange} checked={checked} />;
    },
};

Controlled.args = {
    label: 'bar',
};

Controlled.argTypes = {
    checked: {
        table: {
            disable: true,
        },
    },
    defaultChecked: {
        table: {
            disable: true,
        },
    },
    validatorFn: {
        options: ['noValidator', 'syncValidator', 'asyncValidator'], // An array of serializable values
        mapping: {
            noValidator: undefined,
            syncValidator: validatorSyncBoolean,
            asyncValidator: validatorAsyncBoolean,
        }, // Maps serializable option values to complex arg values
        control: {
            type: 'radio', // Type 'select' is automatically inferred when 'options' is defined
            labels: {
                // 'labels' maps option values to string labels
                noValidator: 'No custom validator',
                syncValidator: 'Sync validator (value !== true)',
                asyncValidator: 'Async validator (value !== true)',
            },
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
