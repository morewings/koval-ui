import type {Meta, StoryObj} from '@storybook/react';

import {InputRadio} from '@/lib/InputRadio';
import {InputCheckbox} from '@/lib/InputCheckbox';

import {InputGroup} from './InputGroup.tsx';

const meta = {
    title: 'Inputs/Group',
    component: InputGroup,
    parameters: {
        layout: 'centered',
    },
    args: {
        disabled: false,
        hint: '',
        required: false,
    },
    argTypes: {
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
    },
} as Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    argTypes: {
        children: {
            options: ['radio', 'checkbox'], // An array of serializable values
            mapping: {
                radio: [
                    <InputRadio value="foo" label="This is a foo name" key="foo" />,
                    <InputRadio value="bar" label="This is a bar name" key="bar" />,
                    <InputRadio value="bazz" label="This is a bazz name" key="bazz" />,
                ],
                checkbox: [
                    <InputCheckbox value="foo" label="This is a foo name" key="zork" required />,
                    <InputCheckbox value="bar" label="This is a bar name" key="gork" disabled />,
                    <InputCheckbox
                        value="bazz"
                        label="This is a bazz name"
                        key="bork"
                        disabled={false}
                    />,
                ],
            }, // Maps serializable option values to complex arg values
            control: {
                type: 'radio', // Type 'select' is automatically inferred when 'options' is defined
                labels: {
                    // 'labels' maps option values to string labels
                    radio: 'radio',
                    checkbox: 'checkbox',
                },
            },
        },
    },
    args: {
        name: 'input-group-example',
        label: 'Example group',
        children: [
            <InputRadio id="foo" value="foo" label="This is a foo name" key="foo" />,
            <InputRadio
                id="bar"
                value="bar"
                label="This is a bar name"
                key="bar"
                disabled={true}
            />,
            <InputRadio id="bazz" value="bazz" label="This is a bazz name" key="bazz" />,
        ],
    },
};

export const Radio: Story = {
    args: {
        name: 'radio-demo',
        label: 'Radio group',
        // disabled: true,
        children: [
            <InputRadio id="foo" value="foo" label="This is a foo name" key="foo" />,
            <InputRadio
                id="bar"
                value="bar"
                label="This is a bar name"
                key="bar"
                disabled={true}
            />,
            <InputRadio id="bazz" value="bazz" label="This is a bazz name" key="bazz" />,
        ],
    },
};

export const RadioBuiltinValidation: Story = {
    args: {
        name: 'radio-builtin-validation-demo',
        label: 'Radio group',
        // disabled: true,
        children: [
            <InputRadio value="foo" label="This is a foo name" key="foo" required />,
            <InputRadio value="bar" label="This is a bar name" key="bar" />,
            <InputRadio value="bazz" label="This is a bazz name" key="bazz" />,
        ],
    },
};

export const RadioNoId: Story = {
    args: {
        name: 'radio-no-id-demo',
        label: 'Radio group',
        // disabled: true,
        children: [
            <InputRadio value="foo" label="This is a foo name" key="zork" />,
            <InputRadio value="bar" label="This is a bar name" key="gork" />,
            <InputRadio value="bazz" label="This is a bazz name" key="bork" />,
        ],
    },
};

export const RadioHint: Story = {
    args: {
        label: 'Radio group',
        hint: 'This is hint example',
        name: 'radio-hint-demo',
        children: [
            <InputRadio value="foo" label="This is a foo name" key="zork" />,
            <InputRadio value="bar" label="This is a bar name" key="gork" />,
            <InputRadio value="bazz" label="This is a bazz name" key="bork" />,
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
            <InputCheckbox
                id="zork"
                name="checkbox-demo"
                value="foo"
                label="This is a foo name"
                key="zork"
                required
            />,
            <InputCheckbox
                id="gork"
                name="checkbox-demo"
                value="bar"
                label="This is a bar name"
                key="gork"
                disabled={true}
            />,
            <InputCheckbox
                id="bork"
                name="checkbox-demo"
                value="bazz"
                label="This is a bazz name"
                key="bork"
            />,
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
            <InputCheckbox
                name="checkbox-demo"
                value="bar"
                label="This is a bar name"
                key="gork"
            />,
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
            <InputCheckbox
                name="checkbox-demo"
                value="foo"
                label="This is a foo name"
                key="zork"
            />,
            <InputCheckbox
                name="checkbox-demo"
                value="bar"
                label="This is a bar name"
                key="gork"
            />,
            <InputCheckbox
                name="checkbox-demo"
                value="bazz"
                label="This is a bazz name"
                key="bork"
            />,
        ],
    },
};

export const CheckboxHint: Story = {
    args: {
        name: 'kitty',
        label: 'Checkbox group',
        hint: 'This is hint example',
        children: [
            <InputCheckbox
                name="checkbox-demo"
                value="foo"
                label="This is a foo name"
                key="zork"
            />,
            <InputCheckbox
                name="checkbox-demo"
                value="bar"
                label="This is a bar name"
                key="gork"
            />,
            <InputCheckbox
                name="checkbox-demo"
                value="bazz"
                label="This is a bazz name"
                key="bork"
            />,
        ],
    },
};

export const CheckboxDisabled: Story = {
    args: {
        name: 'kitty',
        label: 'Checkbox group',
        disabled: true,
        children: [
            <InputCheckbox
                name="checkbox-demo"
                value="foo"
                label="This is a foo name"
                key="zork"
            />,
            <InputCheckbox
                name="checkbox-demo"
                value="bar"
                label="This is a bar name"
                key="gork"
            />,
            <InputCheckbox
                name="checkbox-demo"
                value="bazz"
                label="This is a bazz name"
                key="bork"
            />,
        ],
    },
};
