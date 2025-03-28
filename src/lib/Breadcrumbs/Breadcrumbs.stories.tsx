import type {Meta, StoryObj} from '@storybook/react';
// import {fn} from '@storybook/test';

import {CloudUpload} from '@/internal/Icons';

import type {Props} from './Breadcrumbs.tsx';
import {Breadcrumbs} from './Breadcrumbs.tsx';

const meta = {
    title: 'Components/Breadcrumbs',
    component: Breadcrumbs,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
    },
    args: {
        showEllipsis: false,
    },
    argTypes: {
        linkComponent: {
            table: {
                disable: true,
            },
        },
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
} as Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<Props>;

const itemsMock = [
    {name: 'Main page', url: 'http://foo', icon: CloudUpload},
    {name: 'User Settings', url: 'http://foo'},
    {
        name: 'Indicate the current page’s location within a navigational hierarchy that automatically adds separators',
        url: 'http://foo',
    },
    {name: 'Profile', url: 'http://foo', icon: CloudUpload},
];

export const Primary: Story = {
    name: 'Demo',
    render: args => {
        return <Breadcrumbs {...args} />;
    },
    args: {
        items: itemsMock,
    },
};
