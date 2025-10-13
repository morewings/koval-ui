import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';

import {InputRadio} from '@/lib/InputRadio';
import {InputCheckbox} from '@/lib/InputCheckbox';

import type {Props} from './InputGroup.tsx';
import {InputGroup} from './InputGroup.tsx';

const meta = {
    title: 'Inputs/Group',
    component: InputGroup,
    parameters: {
        layout: 'centered',
    },
    args: {
        onChange: fn(),
        disabled: false,
        hint: 'This is group hint!',
        required: false,
        id: undefined,
        name: 'input-group-example',
    },
    argTypes: {
        onChange: {
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
        id: {
            options: ['noId', 'withId'],
            mapping: {
                noId: undefined,
                withId: 'foo-id',
            },
            control: {
                type: 'radio',
                labels: {
                    noId: 'No id',
                    withId: 'With id',
                },
            },
        },
    },
} as Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<Props>;

export const Primary: Story = {
    name: 'Checkbox group',
    render: args => {
        return (
            <InputGroup {...args}>
                <InputCheckbox id="zork" value="foo" label="Required option" required />
                <InputCheckbox id="gork" value="bar" label="Disabled option" disabled />
                <InputCheckbox
                    value="buzz"
                    label="With custom validation"
                    validation={value => {
                        return !value ? 'Custom message' : '';
                    }}
                />
            </InputGroup>
        );
    },
    args: {
        label: 'Checkbox group',
    },
};

export const Radio: Story = {
    name: 'Radio group',
    render: args => {
        return (
            <InputGroup {...args}>
                <InputRadio value="foo" label="Example option" key="foo" />
                <InputRadio value="bar" label="Required option" key="bar" required />
                <InputRadio value="bazz" label="Disabled option" key="bazz" disabled />
            </InputGroup>
        );
    },
    args: {
        label: 'Radio group',
    },
};
