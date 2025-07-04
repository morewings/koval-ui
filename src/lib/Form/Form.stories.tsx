import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';
import type {ComponentProps} from 'react';
import {useCallback} from 'react';

import {InputText} from '@/lib/InputText';
import {FormField} from '@/lib/FormField';
import {InputGroup} from '@/lib/InputGroup';
import {InputCheckbox} from '@/lib/InputCheckbox';
import {InputRadio} from '@/lib/InputRadio';
import {InputDate} from '@/lib/InputDate';
import {InputDateTime} from '@/lib/InputDateTime';
import {InputColor} from '@/lib/InputColor';
import {InputTime} from '@/lib/InputTime';
import {InputRange} from '@/lib/InputRange';
import {Textarea} from '@/lib/Textarea';
import {Select} from '@/lib/Select';
import {InputFile} from '@/lib/InputFile';
import {InputPassword} from '@/lib/InputPassword';
import {InputNumber} from '@/lib/InputNumber';
import {InputNumeric} from '@/lib/InputNumeric';
import {Button} from '@/lib/Button';
import {validatorSync, validatorAsync} from '@/internal/inputs';

import {Form} from './Form.tsx';

const meta = {
    title: 'Inputs/Form',
    component: Form,
    parameters: {
        layout: 'centered',
    },
    args: {
        onSubmit: fn(),
        onReset: fn(),
        onChange: fn(),
        onInvalid: fn(),
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
type Story = StoryObj<ComponentProps<typeof Form>>;

export const Primary: Story = {
    name: 'With all available inputs',
    render: args => {
        return (
            <Form {...args}>
                <FormField label="Required input">
                    <InputText
                        autoComplete="off"
                        name="foo"
                        placeholder="Required input"
                        required
                    />
                </FormField>
                <FormField label="Custom validation">
                    <InputText autoComplete="off" name="bar" validation={validatorSync} />
                </FormField>
                <FormField label="Custom validation + required">
                    <InputText
                        autoComplete="off"
                        name="grault"
                        validation={validatorSync}
                        required
                    />
                </FormField>
                <FormField label="Async validation">
                    <InputText autoComplete="off" name="baz" validation={validatorAsync} />
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
                <FormField label="Time input">
                    <InputTime required />
                </FormField>
                <FormField label="DateTime input">
                    <InputDateTime required value="1982-06-06T18:18" />
                </FormField>
                <FormField label="Color input">
                    <InputColor value="#CCCCCC" />
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
                <FormField label="Numeric Input" hint="Similar to number">
                    <InputNumeric required={true} />
                </FormField>
                <div style={{display: 'flex', gap: '12px'}}>
                    <Button type="submit">Submit</Button>
                    <Button type="reset" variant="alternative">
                        Reset
                    </Button>
                </div>
            </Form>
        );
    },
    args: {
        onSubmit: (event, state) => {
            event.preventDefault();
            console.log('onSubmit', state);
        },
    },
};

export const ComplexValidation: Story = {
    name: 'Complex validation example',
    args: {
        onSubmit: (event, state) => {
            event.preventDefault();
            console.log('onSubmit', state);
        },
    },
    render: args => {
        const validation = (
            value: unknown,
            _: unknown,
            formState: Record<string, FormDataEntryValue>
        ) => {
            console.log('formState', formState);
            if (formState['case-selector'] === 'lowercase') {
                const isLowerCase = (value as string).toLowerCase() === value;
                return isLowerCase ? '' : 'Only lower case allowed.';
            } else if (formState['case-selector'] === 'uppercase') {
                const isUpperCase = (value as string).toUpperCase() === value;
                return isUpperCase ? '' : 'Only upper case allowed.';
            }
            return '';
        };
        return (
            <Form {...args}>
                <InputGroup name="case-selector">
                    <InputRadio defaultChecked={true} label="Allow uppercase" value="uppercase" />
                    <InputRadio label="Allow lowercase" value="lowercase" />
                </InputGroup>
                <InputText
                    revalidateOnFormChange={true}
                    validation={validation}
                    name="text"
                    placeholder="Validity changes according to user choise"
                />
                <Button type="submit">Submit</Button>
            </Form>
        );
    },
};

export const Password: Story = {
    name: 'Password with confirmation',
    args: {
        onSubmit: (event, state) => {
            event.preventDefault();
            console.log('onSubmit', state);
        },
    },
    render: args => {
        const validatePasswordConfirmation = useCallback(
            (value: unknown, _: unknown, formState: Record<string, FormDataEntryValue>) => {
                if (Boolean(value) && value !== formState['password']) {
                    return "Passwords don't match";
                }
                return '';
            },
            []
        );
        return (
            <Form {...args}>
                <FormField
                    label="Password:"
                    hint="Minimum 6 characters, at least one letter, one number and one special character.">
                    <InputPassword
                        autoComplete="off"
                        pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$"
                        required={true}
                        name="password"
                        placeholder="******"
                    />
                </FormField>
                <FormField label="Confirm password:" hint="Retype password from previous field.">
                    <InputPassword
                        autoComplete="off"
                        validation={validatePasswordConfirmation}
                        required={true}
                        revalidateOnFormChange={true}
                        name="password_confirmation"
                        placeholder="******"
                    />
                </FormField>
            </Form>
        );
    },
};
