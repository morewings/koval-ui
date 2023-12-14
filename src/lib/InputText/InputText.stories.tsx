import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';

import {InputText} from './InputText';

const meta = {
    title: 'Inputs/Text',
    component: InputText,
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
} as Meta<typeof InputText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
    args: {
        defaultValue: 'bar',
    },
};

export const ValidationRequired: Story = {
    render: args => {
        return <InputText {...args} autoComplete="off" required />;
    },
    args: {
        id: 'bar',
    },
};

export const ValidationEmail: Story = {
    render: args => {
        return <InputText {...args} autoComplete="off" type="email" />;
    },
    args: {
        id: 'bar',
    },
};

export const ValidationUrl: Story = {
    render: args => {
        return <InputText {...args} autoComplete="off" type="url" />;
    },
    args: {
        id: 'bar',
    },
};

export const ValidationPattern: Story = {
    render: args => {
        return <InputText {...args} autoComplete="off" pattern="[^@\s]+@[^@\s]+" />;
    },
    args: {
        id: 'bar',
    },
};

export const ValidationCustom: Story = {
    render: args => {
        const validator = (value?: unknown) => {
            if (value && `${value}`.length > 3) {
                return 'too long';
            } else {
                return '';
            }
        };
        return <InputText {...args} autoComplete="off" validatorFn={validator} />;
    },
    args: {
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
        return <InputText {...args} autoComplete="off" validatorFn={validatorAsync} placeholder="Async" />;
    },
    args: {
        id: 'bar',
    },
};
