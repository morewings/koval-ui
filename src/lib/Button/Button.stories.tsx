import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';

import {IconFile, CloudUpload} from '@/internal/Icons';

import {Button} from './Button.tsx';

const meta = {
    title: 'Components/Button',
    component: Button,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    args: {
        onClick: fn(),
    },
    argTypes: {
        onClick: {
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
        variant: {
            control: {
                type: 'radio',
            },
        },
        prefix: {
            options: ['noPrefix', 'withPrefix'],
            mapping: {
                noPrefix: undefined,
                withPrefix: IconFile,
            },
            control: {
                type: 'radio',
                labels: {
                    noPrefix: 'No prefix',
                    withPrefix: 'With prefix',
                },
            },
        },
        suffix: {
            options: ['noSuffix', 'withSuffix'],
            mapping: {
                noSuffix: undefined,
                withSuffix: CloudUpload,
            },
            control: {
                type: 'radio',
                labels: {
                    noSuffix: 'No suffix',
                    withSuffix: 'With suffix',
                },
            },
        },
    },
} as Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render: args => {
        return <Button {...args} />;
    },
    args: {
        children: 'Button',
        disabled: false,
        size: 'medium',
        type: 'button',
        variant: 'primary',
    },
};
