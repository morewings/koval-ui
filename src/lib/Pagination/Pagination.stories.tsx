import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';

import type {Props} from './Pagination.tsx';
import {Pagination} from './Pagination.tsx';

const meta = {
    title: 'Components/Pagination',
    component: Pagination,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    args: {
        onPageSelect: fn(),
        showNavigation: true,
        showPageButtons: true,
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
        onPageSelect: {
            table: {
                disable: true,
            },
        },
    },
} as Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<Props>;

export const Primary: Story = {
    name: 'Demo',
    render: args => {
        return <Pagination {...args} />;
    },
    args: {
        totalPages: 7,
        selectedPage: 1,
    },
};
