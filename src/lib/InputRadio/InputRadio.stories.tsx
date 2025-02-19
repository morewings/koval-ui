import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';
import {type ChangeEvent, useCallback, useState} from 'react';

import {InputRadio} from './InputRadio.tsx';

const meta = {
    title: 'Inputs/Radio',
    component: InputRadio,
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
        disabled: false,
        value: 'foo',
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
} as Meta<typeof InputRadio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    name: 'Non-controlled',
    args: {
        label: 'foo',
        id: 'foo',
        defaultChecked: false,
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
        return <InputRadio {...args} onChange={handleChange} checked={checked} />;
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
};

Controlled.parameters = {
    docs: {
        source: {
            language: 'tsx',
            type: 'code',
        },
    },
};
