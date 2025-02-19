import type {Meta, StoryObj} from '@storybook/react';
// import {fn} from '@storybook/test';

import {Progress} from './Progress.tsx';

const meta = {
    title: 'Components/Progress',
    component: Progress,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    args: {
        variant: 'plain',
        label: 'This is progress',
    },
    argTypes: {
        className: {
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
    },
} as Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    name: 'Basic',
    render: args => {
        return <Progress {...args} />;
    },
    args: {
        max: 100,
        value: 66,
    },
};

export const Indeterminate: Story = {
    render: args => {
        return <Progress {...args} max={100} />;
    },
    args: {},
    argTypes: {
        max: {
            table: {
                disable: true,
            },
        },
        value: {
            table: {
                disable: true,
            },
        },
    },
};
