import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';

import {InputText} from '@/lib/InputText';

import {FormField} from './FormField';

const meta = {
    title: 'Inputs/FormField',
    component: FormField,
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
} as Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
    args: {
        label: 'foo',
        children: <InputText defaultValue="hello" id="foo" required />,
    },
};

export const ExampleWithoutId: Story = {
    args: {
        label: 'foo',
        children: <InputText defaultValue="hello" />,
    },
};

// export const Second: Story = {
//     render: () => {
//         return <InputText data-hello="fal" onClick={3} />;
//     },
//     args: {},
//     parameters: {
//         docs: {
//             source: {language: 'tsx', type: 'code'},
//         },
//     },
// };
