import type {Meta, StoryObj} from '@storybook/react';

// import {fn} from '@storybook/test';
import {localeControl} from '@/internal/locale';

import type {Props} from './NameCurrency.tsx';
import {NameCurrency} from './NameCurrency.tsx';

const meta = {
    title: 'Typography/Name/Currency',
    component: NameCurrency,
    parameters: {
        layout: 'centered',
    },
    args: {
        currencyCode: 'CAD',
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
        locale: localeControl,
    },
} as Meta<typeof NameCurrency>;

export default meta;
type Story = StoryObj<Props>;

export const Primary: Story = {
    render: args => {
        return <NameCurrency {...args} />;
    },
    args: {},
};
