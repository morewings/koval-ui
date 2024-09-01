import type {Meta, StoryObj} from '@storybook/react';
// import {fn} from '@storybook/test';

import {localeControl} from '@/internal/locale';

import {NumberDecimal} from './NumberDecimal.tsx';
import {CompactDisplayModes, LocaleMatchers, SignDisplayModes} from './types.ts';

const meta = {
    title: 'Typography/Number/Decimal',
    component: NumberDecimal,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    args: {
        value: -999345678.093746,
        grouping: true,
        digitsConfig: {
            integer: {
                minimum: 1 as const,
            },
            significant: {
                minimum: 1 as const,
                maximum: 21 as const,
            },
            fraction: {
                minimum: 0 as const,
                maximum: 100 as const,
            },
        },
        locale: undefined,
        localeMatcher: LocaleMatchers['best fit'],
        notation: 'standard',
        compactDisplay: CompactDisplayModes.short,
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
} as Meta<typeof NumberDecimal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    name: 'Decimal',
    render: args => {
        return <NumberDecimal {...args} />;
    },
    args: {},
};
