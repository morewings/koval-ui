import type {Meta, StoryObj} from '@storybook/react';
// import {fn} from '@storybook/test';

import {TemplateName} from './TemplateName.tsx';

const meta = {
    title: 'Components/TemplateName',
    component: TemplateName,
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
} as Meta<typeof TemplateName>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render: args => {
        return <TemplateName {...args} />;
    },
    args: {},
};
