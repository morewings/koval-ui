import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';

import {AttachFile, CloudUpload} from '@/internal/Icons';

import {Button} from './Button.tsx';

const meta = {
    title: 'Inputs/Button',
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
        variant: {
            control: {
                type: 'radio', // Type 'select' is automatically inferred when 'options' is defined
            },
        },
        prefix: {
            options: ['noPrefix', 'withPrefix'], // An array of serializable values
            mapping: {
                noPrefix: undefined,
                withPrefix: AttachFile,
            }, // Maps serializable option values to complex arg values
            control: {
                type: 'radio', // Type 'select' is automatically inferred when 'options' is defined
                labels: {
                    // 'labels' maps option values to string labels
                    noPrefix: 'No prefix',
                    withPrefix: 'With prefix',
                },
            },
        },
        suffix: {
            options: ['noSuffix', 'withSuffix'], // An array of serializable values
            mapping: {
                noSuffix: undefined,
                withSuffix: CloudUpload,
            }, // Maps serializable option values to complex arg values
            control: {
                type: 'radio', // Type 'select' is automatically inferred when 'options' is defined
                labels: {
                    // 'labels' maps option values to string labels
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
