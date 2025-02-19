import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';

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
type Story = StoryObj<typeof meta>;

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

// const onSubmit = (data: unknown) => console.log(data);
//
// type Inputs = {
//     exampleHint: string;
// };
//
// export const ExternalValidation1: Story = {
//     name: 'Hook form validation',
//     args: {
//         onSubmit: (event, state) => {
//             event.preventDefault();
//             console.log('onSubmit', state);
//         },
//     },
//     render: () => {
//         /**
//          * React hook form basic setup. Click Submit to validate.
//          * @see https://react-hook-form.com/docs/useform
//          */
//         const {
//             register,
//             handleSubmit,
//             formState: {errors},
//         } = useForm<Inputs>();
//
//         const validityState = errors.exampleHint ? ValidationState.error : ValidationState.valid;
//
//         return (
//             <Form onSubmit={handleSubmit(onSubmit)}>
//                 <FormField
//                     label="Error message as a hint"
//                     // Display hook form errors as hint message below input
//                     hint={errors.exampleHint?.message as string}>
//                     <InputText
//                         {...register('exampleHint', {
//                             required: 'This field is required!',
//                             minLength: 3,
//                         })}
//                         // Synchronize input validation state with React Hook Form
//                         validation={validityState}
//                         // Set browser input error message
//                         errorMessage={errors.exampleHint?.message as string}
//                     />
//                 </FormField>
//                 <div>
//                     <Button type="submit">Submit</Button>
//                 </div>
//             </Form>
//         );
//     },
// };
//
// /**
//  * Form validation schema
//  * @see https://github.com/jquense/yup?tab=readme-ov-file#schema-basics
//  */
// const schema = yup
//     .object({
//         firstName: yup.string().required(),
//         age: yup.number().nullable().positive().integer(),
//     })
//     .required();
//
// export const ExternalValidation2: Story = {
//     name: 'Hook form validation state',
//     args: {
//         onSubmit: (event, state) => {
//             event.preventDefault();
//             console.log('onSubmit', state);
//         },
//     },
//     render: () => {
//         /**
//          * React hook form basic setup
//          * @see https://react-hook-form.com/docs/useform
//          */
//         const {register, handleSubmit, formState} = useForm({
//             // Here set schema validation
//             resolver: yupResolver(schema),
//             defaultValues: {
//                 firstName: undefined,
//                 age: null,
//             },
//         });
//
//         const getValidity = useCallback(
//             (fieldName: string) => {
//                 // @ts-ignore
//                 const validState = formState.dirtyFields[fieldName]
//                     ? ValidationState.valid
//                     : ValidationState.pristine;
//                 // @ts-ignore
//                 return formState.errors[fieldName] ? ValidationState.error : validState;
//             },
//             [formState.dirtyFields, formState.errors]
//         );
//
//         return (
//             <Form onSubmit={handleSubmit(onSubmit)}>
//                 <FormField
//                     label="First name"
//                     // Set conditional hint from React Hook Form state
//                     hint={formState.errors.firstName?.message}>
//                     <InputText
//                         {...register('firstName')}
//                         // Synchronize input validation state with React Hook Form
//                         validation={getValidity('firstName')}
//                         // Set browser input error message
//                         errorMessage={formState.errors.firstName?.message}
//                     />
//                 </FormField>
//                 <FormField label="Age" hint={formState.errors.age?.message}>
//                     <InputNumber
//                         {...register('age')}
//                         validation={getValidity('age')}
//                         errorMessage={formState.errors.age?.message}
//                     />
//                 </FormField>
//                 <div>
//                     <Button type="submit">Submit</Button>
//                     <Button type="reset" variant="alternative">
//                         Reset
//                     </Button>
//                 </div>
//             </Form>
//         );
//     },
// };
//
// const validationSchemaFormik = yup.object({
//     email: yup.string().email('Enter a valid email').required('Email is required'),
//     password: yup
//         .string()
//         .min(8, 'Password should be of minimum 8 characters length')
//         .required('Password is required'),
// });
//
// export const ExternalValidation3: Story = {
//     name: 'Hook form validation Formik',
//     args: {
//         onSubmit: (event, state) => {
//             event.preventDefault();
//             console.log('onSubmit', state);
//         },
//     },
//     render: () => {
//         /**
//          * React hook form basic setup
//          * @see https://react-hook-form.com/docs/useform
//          */
//         const formik = useFormik({
//             initialValues: {
//                 email: 'foobar@example.com',
//                 password: 'foobar',
//             },
//             validationSchema: validationSchemaFormik,
//             onSubmit: values => {
//                 console.log(values);
//             },
//         });
//         const emailValidationState =
//             formik.touched.email && Boolean(formik.errors.email)
//                 ? ValidationState.error
//                 : ValidationState.valid;
//         const emailHint = formik.touched.email ? formik.errors.email : undefined;
//         const passwordValidationState =
//             formik.touched.password && Boolean(formik.errors.password)
//                 ? ValidationState.error
//                 : ValidationState.valid;
//         const passwordHint = formik.touched.password ? formik.errors.password : undefined;
//
//         return (
//             <Form onSubmit={formik.handleSubmit}>
//                 {/* This input field displays hint below input when validation fails */}
//                 <FormField label="Email" hint={emailHint}>
//                     <InputText
//                         name="email"
//                         value={formik.values.email}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         validation={emailValidationState}
//                         errorMessage={formik.errors.email}
//                     />
//                 </FormField>
//                 {/* This input field tries to display browser input error tooltip */}
//                 <FormField label="Password" hint={passwordHint}>
//                     <InputText
//                         name="password"
//                         value={formik.values.password}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         validation={passwordValidationState}
//                         errorMessage={formik.errors.password}
//                     />
//                 </FormField>
//                 <div>
//                     <Button type="submit">Submit</Button>
//                 </div>
//             </Form>
//         );
//     },
// };
