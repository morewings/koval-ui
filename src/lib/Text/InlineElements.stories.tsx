import type {Meta, StoryObj} from '@storybook/react';
import {Fragment} from 'react';
// import {fn} from '@storybook/test';

import {NumberDecimal, NumberUnit, NumberPercent, NumberCurrency} from '@/lib/Number';
import {DateTime} from '@/lib/DateTime';

import {
    A,
    Del,
    Em,
    Ins,
    I,
    Mark,
    B,
    Sub,
    Sup,
    Small,
    Strong,
    Kbd,
    Code,
    S,
} from './InlineElements.tsx';

const meta = {
    title: 'Typography/Inline Elements',
    component: B,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    args: {},
    argTypes: {
        className: {
            table: {
                disable: true,
            },
        },
    },
} as Meta<typeof B | typeof A | typeof Ins | typeof Del>;

export default meta;
// @ts-expect-error too complex
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render: args => {
        return (
            <Fragment>
                This text is{' '}
                <A {...args} href="#">
                    url
                </A>
                <br />
                This text is <B {...args}>bold</B>
                <br />
                This text is <Strong {...args}>strong</Strong>
                <br />
                This text is <I {...args}>italic</I>
                <br />
                This text is <Em {...args}>emphasized</Em>
                <br />
                This text is <Mark {...args}>marked</Mark>
                <br />
                This text is <Small {...args}>small</Small>
                <br />
                This is <S>strikethrough text</S>
                <br />
                This text is <Del {...args}>deleted</Del>
                <br />
                This text is <Ins {...args}>inserted</Ins>
                <br />
                This is <Sub {...args}>subscript</Sub> and <Sup>superscript</Sup>
                <br />
                This is <Kbd {...args}>Shift</Kbd> and <Kbd>Ctrl</Kbd>
                <br />
                This is <Code {...args}>code</Code>
                <br />
                The number is: <NumberDecimal value={666123.97} />
                <br />
                The percentage is: <NumberPercent value={0.82} />
                <br />
                The revenue is: <NumberCurrency value={100000.06} currency="UAH" />
                <br />
                The volume of barrel is: <NumberUnit value={250.5} unit="liter" />
                <br />
                This was the day: <DateTime value="2019-03-15T16:30:00.000Z" />
                <br />
            </Fragment>
        );
    },
    args: {},
};
