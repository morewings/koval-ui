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
        label: 'Radio group',
        // disabled: true,
        children: [
            <InputRadio id="foo" name="radio-demo1" value="foo" label="This is a foo name" key="foo" />,
            <InputRadio id="bar" name="radio-demo1" value="bar" label="This is a bar name" key="bar" disabled={true} />,
            <InputRadio id="bazz" name="radio-demo1" value="bazz" label="This is a bazz name" key="bazz" />,
        ],
    },
};

export const RadioBuiltinValidation: Story = {
    args: {
        name: 'kitty',
        label: 'Radio group',
        // disabled: true,
        children: [
            <InputRadio name="radio-demo2" value="foo" label="This is a foo name" key="foo" required />,
            <InputRadio name="radio-demo2" value="bar" label="This is a bar name" key="bar" />,
            <InputRadio name="radio-demo2" value="bazz" label="This is a bazz name" key="bazz" />,
        ],
    },
};

export const RadioNoId: Story = {
    args: {
        name: 'kitty',
        label: 'Radio group',
        // disabled: true,
        children: [
            <InputRadio name="checkbox-demo" value="foo" label="This is a foo name" key="zork" />,
            <InputRadio name="checkbox-demo" value="bar" label="This is a bar name" key="gork" />,
            <InputRadio name="checkbox-demo" value="bazz" label="This is a bazz name" key="bork" />,
        ],
    },
};

export const RadioHint: Story = {
    args: {
        name: 'kitty',
        label: 'Radio group',
        hint: 'This is hint example',
        children: [
            <InputRadio name="checkbox-demo" value="foo" label="This is a foo name" key="zork" />,
            <InputRadio name="checkbox-demo" value="bar" label="This is a bar name" key="gork" />,
            <InputRadio name="checkbox-demo" value="bazz" label="This is a bazz name" key="bork" />,
        ],
    },
};

export const RadioDisabled: Story = {
    args: {
        name: 'kitty',
        label: 'Radio group',
        disabled: true,
        children: [
            <InputRadio name="checkbox-demo" value="foo" label="This is a foo name" key="zork" />,
            <InputRadio name="checkbox-demo" value="bar" label="This is a bar name" key="gork" />,
            <InputRadio name="checkbox-demo" value="bazz" label="This is a bazz name" key="bork" />,
        ],
    },
};

export const Checkbox: Story = {
    args: {
        name: 'kitty',
        label: 'Checkbox group',
        children: [
            <InputCheckbox id="zork" name="checkbox-demo" value="foo" label="This is a foo name" key="zork" required />,
            <InputCheckbox
                id="gork"
                name="checkbox-demo"
                value="bar"
                label="This is a bar name"
                key="gork"
                disabled={true}
            />,
            <InputCheckbox id="bork" name="checkbox-demo" value="bazz" label="This is a bazz name" key="bork" />,
        ],
    },
};

export const CheckboxCustomValidation: Story = {
    args: {
        name: 'kitty',
        label: 'Checkbox group',
        children: [
            <InputCheckbox
                name="checkbox-demo"
                value="foo"
                label="This is a foo name"
                key="zork"
                required
                validatorFn={value => {
                    return !value ? 'Custom message' : '';
                }}
            />,
            <InputCheckbox name="checkbox-demo" value="bar" label="This is a bar name" key="gork" />,
            <InputCheckbox
                name="checkbox-demo"
                value="bazz"
                label="This is a bazz name"
                key="bork"
                validatorFn={value => {
                    return !value ? 'Custom message' : '';
                }}
            />,
        ],
    },
};

export const CheckboxNoId: Story = {
    args: {
        name: 'kitty',
        label: 'Checkbox group',
        children: [
            <InputCheckbox name="checkbox-demo" value="foo" label="This is a foo name" key="zork" />,
            <InputCheckbox name="checkbox-demo" value="bar" label="This is a bar name" key="gork" />,
            <InputCheckbox name="checkbox-demo" value="bazz" label="This is a bazz name" key="bork" />,
        ],
    },
};

export const CheckboxHint: Story = {
    args: {
        name: 'kitty',
        label: 'Checkbox group',
        hint: 'This is hint example',
        children: [
            <InputCheckbox name="checkbox-demo" value="foo" label="This is a foo name" key="zork" />,
            <InputCheckbox name="checkbox-demo" value="bar" label="This is a bar name" key="gork" />,
            <InputCheckbox name="checkbox-demo" value="bazz" label="This is a bazz name" key="bork" />,
        ],
    },
};

export const CheckboxDisabled: Story = {
    args: {
        name: 'kitty',
        label: 'Checkbox group',
        disabled: true,
        children: [
            <InputCheckbox name="checkbox-demo" value="foo" label="This is a foo name" key="zork" />,
            <InputCheckbox name="checkbox-demo" value="bar" label="This is a bar name" key="gork" />,
            <InputCheckbox name="checkbox-demo" value="bazz" label="This is a bazz name" key="bork" />,
        ],
    },
};
