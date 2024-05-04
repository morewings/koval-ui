import type {Meta, StoryObj} from '@storybook/react';
// import {fn} from '@storybook/test';

import {Button} from '@/lib';

import {ButtonGroup} from './ButtonGroup.tsx';

const meta = {
    title: 'Components/ButtonGroup',
    component: ButtonGroup,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    args: {},
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
    },
} as Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render: args => {
        return (
            <ButtonGroup {...args}>
                <Button>Foo</Button>
                <Button variant="action">Bar</Button>
                <Button variant="danger">Bazz</Button>
            </ButtonGroup>
        );
    },
    args: {},
};
