import type {Meta, StoryObj} from '@storybook/react';

// import {fn} from '@storybook/test';
import {localeControl} from '@/internal/locale';

import type {Props} from './NameRegion.tsx';
import {NameRegion} from './NameRegion.tsx';

const meta = {
    title: 'Typography/Name/Region',
    component: NameRegion,
    parameters: {
        layout: 'centered',
    },
    args: {
        countryCode: 'SE',
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
} as Meta<typeof NameRegion>;

export default meta;
type Story = StoryObj<Props>;

export const Primary: Story = {
    render: args => {
        return <NameRegion {...args} />;
    },
    args: {},
};
