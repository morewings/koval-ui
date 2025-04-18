import type {Meta, StoryObj} from '@storybook/react';
// import {fn} from '@storybook/test';

import {localeControl, CurrencyCodes} from '@/internal/locale';

import type {Props} from './NumberCurrency.tsx';
import {NumberCurrency} from './NumberCurrency.tsx';
import {SignDisplayModes, CurrencyDisplayTypes, CurrencySignModes} from './types.ts';

const meta = {
    title: 'Typography/Number/Currency',
    component: NumberCurrency,
    parameters: {
        layout: 'centered',
    },
    args: {
        locale: undefined,
        value: 1999345678.09,
        currency: CurrencyCodes.EUR,
        currencyDisplay: CurrencyDisplayTypes.symbol,
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
        signDisplay: SignDisplayModes.auto,
        currencySign: CurrencySignModes.standard,
    },
    argTypes: {
        digitsConfig: {
            table: {
                disable: true,
            },
        },
        className: {
            table: {
                disable: true,
            },
        },
        localeMatcher: {
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
} as Meta<typeof NumberCurrency>;

export default meta;
type Story = StoryObj<Props>;

export const Primary: Story = {
    name: 'Currency',
    render: args => {
        return <NumberCurrency {...args} />;
    },
    args: {},
};
