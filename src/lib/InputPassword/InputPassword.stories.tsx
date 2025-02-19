import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';
import {type ChangeEvent, useCallback, useState} from 'react';

import {validationControl} from '@/internal/inputs/storybook/validationControl.ts';
import {patternControl} from '@/internal/inputs/storybook/patternControl.ts';

import {InputPassword} from './InputPassword.tsx';

const meta = {
    title: 'Inputs/Password',
    component: InputPassword,
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
        autoComplete: 'off',
        placeholder: 'Password',
        readOnly: false,
        disabled: false,
        size: 16,
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
        validation: validationControl,
        prefix: {
            table: {
                disable: true,
            },
        },
        pattern: patternControl,
    },
} as Meta<typeof InputPassword>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    name: 'Non-controlled',
    render: args => {
        return <InputPassword {...args} />;
    },
    args: {},
};

export const Controlled: Story = {
    render: args => {
        const [value, setValue] = useState(args.value);
        const handleChange = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                console.log('Value captured:', event.target.value);
                setValue(event.target.value);
            },
            [setValue]
        );
        return <InputPassword {...args} value={value} onChange={handleChange} />;
    },
};

Controlled.args = {
    value: 'Controlled value',
};

Controlled.argTypes = {
    defaultValue: {
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
