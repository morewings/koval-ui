import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';

import {validationControlDate} from '@/internal/inputs/storybook/validationControl.ts';

import {InputDateTime} from './InputDateTime.tsx';

const meta = {
    title: 'Inputs/DateTime',
    component: InputDateTime,
    parameters: {
        layout: 'centered',
    },
    args: {
        onBlur: fn(),
        onFocus: fn(),
        onKeyDown: fn(),
        onKeyUp: fn(),
        onChange: fn(),
        required: false,
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
        validation: validationControlDate,
        prefix: {
            table: {
                disable: true,
            },
        },
    },
} as Meta<typeof InputDateTime>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    name: 'Non-controlled state 🚧️',
    render: args => {
        return <InputDateTime {...args} />;
    },
    args: {},
};
