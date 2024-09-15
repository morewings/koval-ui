import type {Meta, StoryObj} from '@storybook/react';
// import {fn} from '@storybook/test';

import {Flag} from './Flag.tsx';

const meta = {
    title: 'Components/Flag',
    component: Flag,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    args: {
        countryCode: 'MK',
        size: 36,
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
} as Meta<typeof Flag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render: args => {
        return <Flag {...args} />;
    },
    args: {},
};
