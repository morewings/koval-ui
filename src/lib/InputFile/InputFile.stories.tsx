import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';

import {ValidationState} from '@/internal/inputs';

import {InputFile} from './InputFile.tsx';

const meta = {
    title: 'Inputs/File',
    component: InputFile,
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
        disabled: false,
        multiple: false,
        placeholder: '',
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
        validation: {
            // TODO: add function validation example
            options: ['error', 'valid', 'inProgress', 'pristine'],
            mapping: {
                error: ValidationState.error,
                valid: ValidationState.valid,
                inProgress: ValidationState.inProgress,
                pristine: ValidationState.pristine,
            },
            control: {
                type: 'radio',
                labels: {
                    error: 'External validation: "error"',
                    valid: 'External validation: "valid"',
                    inProgress: 'External validation: "inProgress"',
                    pristine: 'External validation: "pristine"',
                },
            },
        },
    },
} as Meta<typeof InputFile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render: args => {
        return <InputFile {...args} />;
    },
    args: {},
};

export const WithCode: Story = {
    render: args => {
        // here comes the code
        return <InputFile {...args} />;
    },
};

WithCode.args = {
    id: 'foo',
};

WithCode.argTypes = {};

WithCode.parameters = {
    docs: {
        source: {
            language: 'tsx',
            type: 'code',
        },
    },
};
