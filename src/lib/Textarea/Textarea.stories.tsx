import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';
import {type ChangeEvent, useCallback, useState} from 'react';

import {validationControl} from '@/internal/inputs/storybook/validationControl.ts';
import {prefixControl} from '@/internal/inputs/storybook/prefixControl.ts';

import {Textarea} from './Textarea.tsx';

const meta = {
    title: 'Inputs/Textarea',
    component: Textarea,
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
        revalidateOnFormChange: {
            table: {
                disable: true,
            },
        },
        validation: validationControl,
        prefix: prefixControl,
    },
} as Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    name: 'Non-controlled',
    render: args => {
        return <Textarea {...args} />;
    },
    args: {
        placeholder: 'This is Textarea',
        defaultValue: 'hello',
    },
};

export const Controlled: Story = {
    render: args => {
        const [value, setValue] = useState(args.value);
        const handleChange = useCallback(
            (event: ChangeEvent<HTMLTextAreaElement>) => {
                console.log('Value captured:', event.target.value);
                setValue(event.target.value);
            },
            [setValue]
        );
        return (
            <div>
                <Textarea {...args} value={value} onChange={handleChange} />
            </div>
        );
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
