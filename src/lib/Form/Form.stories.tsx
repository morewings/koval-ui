import type {Meta, StoryObj} from '@storybook/react';
import {Fragment} from 'react';
import {fn} from '@storybook/test';

import {InputText} from '@/lib/InputText';
import {FormField} from '@/lib/FormField';
import {InputGroup} from '@/lib/InputGroup';
import {InputCheckbox} from '@/lib/InputCheckbox';
import {InputRadio} from '@/lib/InputRadio';
import {InputDate} from '@/lib/InputDate';
import {InputColor} from '@/lib/InputColor';
import {InputTime} from '@/lib/InputTime';
import {InputRange} from '@/lib/InputRange';
import {Textarea} from '@/lib/Textarea';
import {Select} from '@/lib/Select';
import {InputFile} from '@/lib/InputFile';
import {InputPassword} from '@/lib/InputPassword';
import {InputNumber} from '@/lib/InputNumber';
import {Button} from '@/lib/Button';
import {validatorSync, validatorAsync} from '@/internal/inputs';

import {Form} from './Form.tsx';

const meta = {
    title: 'Inputs/Form',
    component: Form,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    args: {
        onSubmit: fn(),
        onReset: fn(),
        onChange: fn(),
        onInvalid: fn(),
        autoComplete: 'off',
        autoCapitalize: 'off',
        noValidate: false,
    },
    argTypes: {
        onSubmit: {
            table: {
                disable: true,
            },
        },
        onReset: {
            table: {
                disable: true,
            },
        },
        onChange: {
            table: {
                disable: true,
            },
        },
        onInvalid: {
            table: {
                disable: true,
            },
        },
        children: {
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
        noValidate: {
            control: 'boolean',
        },
    },
} as Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
    args: {
        onSubmit: (event, state) => {
            event.preventDefault();
            console.log('onSubmit', state);
        },
        children: (
            <Fragment>
                <FormField label="Required input">
                    <InputText autoComplete="off" name="foo" placeholder="Required input" required />
                </FormField>
                <FormField label="Custom validation">
                    <InputText autoComplete="off" name="bar" validatorFn={validatorSync} />
                </FormField>
                <FormField label="Custom validation + required">
                    <InputText autoComplete="off" name="grault" validatorFn={validatorSync} required />
                </FormField>
                <FormField label="Async validation">
                    <InputText autoComplete="off" name="baz" validatorFn={validatorAsync} />
                </FormField>
                <InputGroup name="qux" label="Radio group required" required>
                    <InputRadio value="foo-required" label="This is a foo name" />
                    <InputRadio disabled value="bar-required" label="This is a bar name" />
                    <InputRadio value="bazz-required" label="This is a bazz name" />
                </InputGroup>
                <InputGroup name="corge" label="Checkbox group">
                    <InputCheckbox value="foo" label="This is a foo name" key="zork" required />
                    <InputCheckbox required value="bar" label="This is a bar name" key="gork" />
                    <InputCheckbox disabled value="bazz" label="This is a bazz name" key="bork" />
                </InputGroup>
                <FormField label="Date input">
                    <InputDate required defaultValue="2018-07-22" />
                </FormField>
                <FormField label="Color input">
                    <InputColor value="#CCCCCC" />
                </FormField>
                <FormField label="Time input">
                    <InputTime required />
                </FormField>
                <FormField label="Range input">
                    <InputRange required={true} />
                </FormField>
                <FormField label="Textarea">
                    <Textarea required={true} />
                </FormField>
                <FormField label="Select">
                    <Select>
                        <option value="Option 1">Option 1</option>
                        <option value="Option 2">Option 2</option>
                        <option value="Option 3">Option 3</option>
                    </Select>
                </FormField>
                <FormField label="File Input">
                    <InputFile required={true} />
                </FormField>
                <FormField label="Password Input">
                    <InputPassword required={true} />
                </FormField>
                <FormField label="Number Input">
                    <InputNumber required={true} />
                </FormField>
                <div style={{display: 'flex', gap: '12px'}}>
                    <Button type="submit">Submit</Button>
                    <Button type="reset" variant="alternative">
                        Reset
                    </Button>
                </div>
            </Fragment>
        ),
    },
};
