import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';
import type {ChangeEvent} from 'react';
import {useCallback, useState} from 'react';

import {timeout} from '@/internal/inputs';

import {InputTime} from './InputTime.tsx';

const meta = {
    title: 'Inputs/Time',
    component: InputTime,
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
        placeholder: '',
        readOnly: false,
        disabled: false,
        autoComplete: 'off',
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
        validatorFn: {
            options: ['noValidator', 'syncValidator', 'asyncValidator'], // An array of serializable values
            mapping: {
                noValidator: undefined,
                syncValidator: (value?: unknown) => {
                    console.log('Value captured:', value);
                    if (value && value !== '23:23') {
                        return 'Should be 23:23';
                    } else {
                        return '';
                    }
                },
                asyncValidator: async (value?: unknown) => {
                    console.log('Value captured:', value);
                    await timeout(1000);
                    if (value && value !== '23:23') {
                        return `Should be 23:23! Last captured: ${value}`;
                    } else {
                        return '';
                    }
                },
            }, // Maps serializable option values to complex arg values
            control: {
                type: 'radio', // Type 'select' is automatically inferred when 'options' is defined
                labels: {
                    // 'labels' maps option values to string labels
                    noValidator: 'No custom validator',
                    syncValidator: 'Sync validator (value === 23:23)',
                    asyncValidator: 'Async validator (value === 23:23)',
                },
            },
        },
        prefix: {
            table: {
                disable: true,
            },
        },
    },
} as Meta<typeof InputTime>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render: args => {
        return <InputTime {...args} />;
    },
    args: {
        defaultValue: '',
        placeholder: 'Text input',
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
    },
};

export const ControlledState: Story = {
    render: args => {
        const [value, setValue] = useState(args.value);
        const handleChange = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                console.log('Value captured:', event.target.value);
                setValue(event.target.value);
            },
            [setValue]
        );
        return <InputTime {...args} onChange={handleChange} value={value} />;
    },
};

ControlledState.args = {
    value: '12:15',
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
