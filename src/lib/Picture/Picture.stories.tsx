import type {Meta, StoryObj} from '@storybook/react';
// import {fn} from '@storybook/test';

import {Picture} from './Picture.tsx';

const meta = {
    title: 'Embeds & IFrame/Picture',
    component: Picture,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
        chromatic: {disableSnapshot: true},
    },
    args: {},
    argTypes: {
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
        className: {
            table: {
                disable: true,
            },
        },
    },
} as Meta<typeof Picture>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    name: 'Demo basic',
    render: args => {
        return <Picture {...args} />;
    },
    args: {
        src: 'https://picsum.photos/300/333',
        width: 300,
        height: 333,
        alt: 'Image description',
        sources: [
            {
                src: 'https://picsum.photos/600/666',
                mediaCondition: '(orientation: portrait)',
            },
        ],
    },
};

export const Responsive: Story = {
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
    },
    render: args => {
        return <Picture {...args} />;
    },
    args: {
        src: 'https://picsum.photos/999/666',
        width: 999,
        height: 666,
        alt: 'Image description',
    },
};
