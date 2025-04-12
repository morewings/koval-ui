import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';
import {type ChangeEvent, useCallback, useState} from 'react';

import {prefixControl} from '@/internal/inputs/storybook/prefixControl.ts';
import {validationControl} from '@/internal/inputs/storybook/validationControl.ts';
import {patternControl} from '@/internal/inputs/storybook/patternControl.ts';

import {InputText} from './InputText';

const meta = {
    title: 'Inputs/Text',
    component: InputText,
    parameters: {
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
        size: 16,
        errorMessage: 'External error message example.',
    },
    argTypes: {
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
        validation: validationControl,
        pattern: patternControl,
        prefix: prefixControl,
    },
} as Meta<typeof InputText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    name: 'Non-controlled',
    render: args => {
        return <InputText {...args} />;
    },
    args: {},
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
        return <InputText {...args} value={value} onChange={handleChange} />;
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
