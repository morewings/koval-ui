import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';

import {InputText} from '@/lib/InputText';
import {InputDate} from '@/lib/InputDate';
import {InputColor} from '@/lib/InputColor';
import {InputTime} from '@/lib/InputTime';
import {InputRange} from '@/lib/InputRange';
import {Textarea} from '@/lib/Textarea';
import {Select} from '@/lib/Select';
import {InputFile} from '@/lib/InputFile';
import {InputNumber} from '@/lib/InputNumber';
import {InputPassword} from '@/lib/InputPassword';
import {InputNumeric} from '@/lib/InputNumeric';
import {InputDateTime} from '@/lib/InputDateTime';

import type {Props} from './FormField';
import {FormField} from './FormField';

const meta = {
    title: 'Inputs/FormField',
    component: FormField,
    parameters: {
        layout: 'centered',
    },
    args: {
        onClick: fn(),
        onBlur: fn(),
        onFocus: fn(),
        onKeyDown: fn(),
        onKeyUp: fn(),
        hint: 'This is hint',
        required: false,
        id: undefined,
    },
    argTypes: {
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
        children: {
            options: [
                'text',
                'date',
                'dateTime',
                'color',
                'time',
                'range',
                'select',
                'file',
                'password',
                'textarea',
                'number',
                'numeric',
            ],
            mapping: {
                text: <InputText />,
                date: <InputDate />,
                dateTime: <InputDateTime />,
                color: <InputColor defaultValue="#CECECE" />,
                time: <InputTime />,
                range: <InputRange />,
                textarea: <Textarea />,
                file: <InputFile />,
                password: <InputPassword />,
                number: <InputNumber />,
                numeric: <InputNumeric />,
                select: (
                    <Select>
                        <option value="Option 1">Option 1</option>
                        <option value="Option 2">Option 2</option>
                        <option value="Option 3">Option 3</option>
                    </Select>
                ),
            },
            control: {
                type: 'radio',
                labels: {
                    text: 'With Text Input',
                    date: 'With Date Input',
                    dateTime: 'With DateTime Input',
                    color: 'With Color Input',
                    time: 'With Time Input',
                    range: 'With Range Input',
                    textarea: 'With Textarea',
                    select: 'With Select',
                    file: 'With File Input',
                    password: 'With Password Input',
                    number: 'With Number Input',
                    numeric: 'With Numeric Input',
                },
            },
        },
    },
} as Meta<typeof FormField>;

export default meta;
type Story = StoryObj<Props>;

export const Primary: Story = {
    name: 'With all inputs',
    args: {
        label: 'foo',
    },
    render: ({children = <InputText />, ...args}) => {
        return <FormField {...args}>{children}</FormField>;
    },
};
