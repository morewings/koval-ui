import type {Meta, StoryObj} from '@storybook/react';

import {InputText} from './InputText';

const meta = {
    title: 'Inputs/Text',
    component: InputText,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
} as Meta<typeof InputText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
    args: {
        foo: 'bar',
    },
};

export const Second: Story = {
    // render: args => {
    //     return <Icon {...args} />;
    // },
    args: {},
    parameters: {
        docs: {
            source: {language: 'tsx', type: 'code'},
        },
    },
};
