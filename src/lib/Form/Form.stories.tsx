import type {Meta, StoryObj} from '@storybook/react';
import {Fragment} from 'react';
import {fn} from '@storybook/test';

import {InputText} from '@/lib/InputText';
import {FormField} from '@/lib/FormField';
import {InputGroup} from '@/lib/InputGroup';
import {InputCheckbox} from '@/lib/InputCheckbox';
import {InputRadio} from '@/lib/InputRadio';

import {Form} from './Form.tsx';

const meta = {
    title: 'Inputs/Form',
    component: Form,
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
} as Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
    args: {
        children: (
            <Fragment>
                <FormField label="foo">
                    <InputText name="foo" required />
                </FormField>
                <InputGroup name="radio-demo" label="Radio group">
                    <InputRadio value="foo" label="This is a foo name" />
                    <InputRadio disabled value="bar" label="This is a bar name" />
                    <InputRadio value="bazz" label="This is a bazz name" />
                </InputGroup>
                <InputGroup name="radio-demo-required" label="Radio group required" required>
                    <InputRadio value="foo-required" label="This is a foo name" />
                    <InputRadio disabled value="bar-required" label="This is a bar name" />
                    <InputRadio value="bazz-required" label="This is a bazz name" />
                </InputGroup>
                <InputGroup name="checkbox-demo" label="Radio group">
                    <InputCheckbox value="foo" label="This is a foo name" key="zork" required />
                    <InputCheckbox required value="bar" label="This is a bar name" key="gork" />
                    <InputCheckbox disabled value="bazz" label="This is a bazz name" key="bork" />
                </InputGroup>
                <div>
                    <button type="submit">Submit</button>
                    <br />
                    <button type="reset">Reset</button>
                </div>
            </Fragment>
        ),
    },
};

export const RefExample: Story = {
    render: () => {
        const ref = (element: never) => {
            console.log('element', element);
        };
        return <Form ref={ref}>Form content</Form>;
    },
};
