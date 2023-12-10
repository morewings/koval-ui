import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';

import {InputRadio} from '@/lib/InputRadio';
import {InputCheckbox} from '@/lib/InputCheckbox';

import {InputGroup} from './InputGroup.tsx';

const meta = {
    title: 'Inputs/Group',
    component: InputGroup,
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
} as Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Radio: Story = {
    args: {
        name: 'kitty',
        id: 'foo',
        label: 'Radio group',
        // disabled: true,
        children: [
            <InputRadio id="foo" name="radio-demo" value="foo" label="This is a foo name" key="foo" />,
            <InputRadio id="bar" name="radio-demo" value="bar" label="This is a bar name" key="bar" />,
            <InputRadio id="bazz" name="radio-demo" value="bazz" label="This is a bazz name" key="bazz" />,
        ],
    },
};

export const Checkbox: Story = {
    args: {
        name: 'kitty',
        id: 'foo',
        label: 'Checkbox group',
        // disabled: true,
        children: [
            <InputCheckbox id="zork" name="checkbox-demo" value="foo" label="This is a foo name" key="zork" required />,
            <InputCheckbox id="gork" name="checkbox-demo" value="bar" label="This is a bar name" key="gork" />,
            <InputCheckbox id="bork" name="checkbox-demo" value="bazz" label="This is a bazz name" key="bork" />,
        ],
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
