import type {Meta, StoryObj} from '@storybook/react';
// import {fn} from '@storybook/test';

import {localeControl} from '@/internal/locale';

import {NumberPercent} from './NumberPercent.tsx';
import {LocaleMatchers, SignDisplayModes} from './types.ts';

const meta = {
    title: 'Typography/Number/Percent',
    component: NumberPercent,
    parameters: {
        layout: 'centered',
    },
    args: {
        value: 0.6942,
        grouping: true,
        digitsConfig: {
            integer: {
                minimum: 1,
            },
            significant: {
                minimum: 1,
                maximum: 21,
            },
            fraction: {},
        },
        locale: undefined,
        localeMatcher: LocaleMatchers['best fit'],
        signDisplay: SignDisplayModes.auto,
    },
    argTypes: {
        digitsConfig: {
            table: {
                disable: true,
            },
        },
        localeMatcher: {
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
        locale: localeControl,
    },
} as Meta<typeof NumberPercent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    name: 'Percent',
    render: args => {
        return <NumberPercent {...args} />;
    },
    args: {},
};
