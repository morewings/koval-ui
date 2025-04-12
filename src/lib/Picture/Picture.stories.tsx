import type {Meta, StoryObj} from '@storybook/react';
// import {fn} from '@storybook/test';

import type {Props} from './Picture.tsx';
import {Picture} from './Picture.tsx';

const meta = {
    title: 'Embeds & IFrame/Picture',
    component: Picture,
    parameters: {
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
type Story = StoryObj<Props>;

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
