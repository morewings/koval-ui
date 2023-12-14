import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';

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
        dataAttributes: {
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
        required: {
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
    },
} as Meta<typeof InputCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
    args: {
        label: 'bar',
        id: 'foo',
    },
};

export const Validation: Story = {
    render: args => {
        const validator = (checked?: unknown) => {
            if (!checked) {
                return 'Custom error!';
            }
            return '';
        };
        return <InputCheckbox {...args} required validatorFn={validator} />;
    },
    args: {
        label: 'bar',
        id: 'bar',
    },
};

const timeout = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

const validatorAsync = async () => {
    await timeout(1000);
    return 'Async result';
};

export const ValidationAsync: Story = {
    render: args => {
        return <InputCheckbox {...args} validatorFn={validatorAsync} label="Async" />;
    },
    args: {
        id: 'bar',
    },
};
