import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';
import {type ChangeEvent, useCallback, useState} from 'react';

import {CloudUpload} from '@/internal/Icons';

import {InputRange} from './InputRange.tsx';

const timeout = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

const meta = {
    title: 'Inputs/Range',
    component: InputRange,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
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
                        return `Too long. Value captured: ${value}`;
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
} as Meta<typeof InputRange>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
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
