import type {Meta, StoryObj} from '@storybook/react';
// import {fn} from '@storybook/test';

import {Units, localeControl} from '@/internal/locale';

import {NumberUnit} from './NumberUnit.tsx';
import {CompactDisplayModes, LocaleMatchers, SignDisplayModes} from './types.ts';

const meta = {
    title: 'Typography/Number/Unit',
    component: NumberUnit,
    parameters: {
        layout: 'centered',
    },
    args: {
        locale: undefined,
        value: 123456.189,
        unit: Units.liter,
        unitDisplay: 'short',
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
} as Meta<typeof NumberUnit>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    name: 'Unit',
    render: args => {
        return <NumberUnit {...args} />;
    },
    args: {},
};
