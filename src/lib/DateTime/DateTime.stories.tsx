import type {Meta, StoryObj} from '@storybook/react';
// import {fn} from '@storybook/test';

import {localeControl} from '@/internal/locale';

import {DateTime} from './DateTime.tsx';

const meta = {
    title: 'Typography/DateTime',
    component: DateTime,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    args: {
        value: '2019-03-15T16:30:00.000Z',
    },
    argTypes: {
        locale: localeControl,
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
} as Meta<typeof DateTime>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    name: 'Demo',
    render: args => {
        return <DateTime {...args} />;
    },
    args: {
        locale: undefined,
        era: 'long',
        year: 'numeric',
        month: 'long',
        weekday: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
        timeZoneName: 'long',
        enableNoWrap: true,
    },
};

export const DefaultView: Story = {
    name: 'Default view',
    render: args => {
        return <DateTime {...args} />;
    },
    args: {},
};
