import type {Meta, StoryObj} from '@storybook/react';
// import {fn} from '@storybook/test';

import {BlockQuote} from './BlockQuote.tsx';

const meta = {
    title: 'Typography/BlockQuote',
    component: BlockQuote,
    parameters: {
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
} as Meta<typeof BlockQuote>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    name: 'Demo',
    render: args => {
        return (
            <BlockQuote {...args}>
                Words can be like X-rays, if you use them properly—they’ll go through anything. You
                read and you’re pierced.
                <cite>George Clooney</cite>
            </BlockQuote>
        );
    },
    args: {},
};
