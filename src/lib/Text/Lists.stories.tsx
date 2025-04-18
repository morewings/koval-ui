import type {Meta, StoryObj} from '@storybook/react';

import type {Props} from './Lists.tsx';
import {Ol, Ul, Dl} from './Lists.tsx';

const meta = {
    title: 'Typography/Lists',
    component: Ul,
    parameters: {
        layout: 'centered',
    },
    args: {},
    argTypes: {
        className: {
            table: {
                disable: true,
            },
        },
    },
} as Meta<typeof Ul | typeof Ol | typeof Dl>;

export default meta;
type Story = StoryObj<Props>;

export const Primary: Story = {
    name: 'Unordered',
    render: args => {
        return (
            <Ul {...args}>
                <li>Unordered item 1</li>
                <li>Unordered item 2</li>
                <li>Unordered item 3</li>
            </Ul>
        );
    },
    args: {},
};

export const Ordered: Story = {
    render: args => {
        return (
            <Ol {...args}>
                <li>Ordered item 1</li>
                <li>Ordered item 2</li>
                <li>Ordered item 3</li>
            </Ol>
        );
    },
    args: {},
};

export const Description: Story = {
    render: args => {
        return (
            <Dl {...args}>
                <dt>Beast of Bodmin</dt>
                <dd>A large feline inhabiting Bodmin Moor.</dd>

                <dt>Morgawr</dt>
                <dd>A sea serpent.</dd>

                <dt>Owlman</dt>
                <dd>A giant owl-like creature.</dd>
            </Dl>
        );
    },
    args: {},
};
