import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';
import {type ChangeEvent, useCallback, useState} from 'react';

import {timeout} from '@/internal/inputs';

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
        required: false,
        readOnly: false,
        disabled: false,
        min: -100,
        max: 100,
        step: 10,
        size: 9,
    },
    argTypes: {
        value: {control: 'text'},
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
        validatorFn: {
            options: ['noValidator', 'syncValidator', 'asyncValidator'], // An array of serializable values
            mapping: {
                noValidator: undefined,
                syncValidator: (value: number) => {
                    if (value > 66) {
                        return 'Too big';
                    }
                    return '';
                },
                asyncValidator: async (value: number) => {
                    console.log('Value captured:', value);
                    await timeout(1000);
                    if (value > 66) {
                        return `Too big. Value captured: ${value}`;
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
                    syncValidator: 'Sync validator (value > 66 )',
                    asyncValidator: 'Async validator (value > 66 )',
                },
            },
        },
    },
} as Meta<typeof InputNumber>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
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
};

Controlled.args = {
    step: 11,
};

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
