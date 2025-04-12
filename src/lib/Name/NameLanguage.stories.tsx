import type {Meta, StoryObj} from '@storybook/react';

// import {fn} from '@storybook/test';
import {localeControl} from '@/internal/locale';

import type {Props} from './NameLanguage.tsx';
import {NameLanguage} from './NameLanguage.tsx';

const meta = {
    title: 'Typography/Name/Language',
    component: NameLanguage,
    parameters: {
        layout: 'centered',
    },
    args: {
        languageCode: 'sa',
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
} as Meta<typeof NameLanguage>;

export default meta;
type Story = StoryObj<Props>;

export const Primary: Story = {
    render: args => {
        return <NameLanguage {...args} />;
    },
    args: {},
};
