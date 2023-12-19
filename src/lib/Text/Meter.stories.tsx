import type {Meta, StoryObj} from '@storybook/react';
// import {fn} from '@storybook/test';

import {Meter} from './Meter.tsx';

const meta = {
    title: 'Typography/Meter',
    component: Meter,
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
        max: {control: {type: 'range', min: 1, max: 100, step: 1}},
        min: {control: {type: 'range', min: 1, max: 100, step: 1}},
        value: {control: {type: 'range', min: 1, max: 100, step: 1}},
        low: {control: {type: 'range', min: 1, max: 100, step: 1}},
        high: {control: {type: 'range', min: 1, max: 100, step: 1}},
        optimum: {control: {type: 'range', min: 1, max: 100, step: 1}},
    },
} as Meta<typeof Meter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render: function Render(args) {
        return <Meter {...args} />;
    },
    args: {
        max: 100,
        min: 1,
        value: 33,
        low: 20,
        high: 70,
        optimum: 22,
    },
};

export const WithCode: Story = {
    render: args => {
        // here comes the code
        return <Meter {...args} />;
    },
};

WithCode.args = {
    id: 'foo',
};

WithCode.argTypes = {};

WithCode.parameters = {
    docs: {
        source: {
            language: 'tsx',
            type: 'code',
        },
    },
};
