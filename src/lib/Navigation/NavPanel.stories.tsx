import type {Meta, StoryObj} from '@storybook/react';
// import {fn} from '@storybook/test';

import {NavLink, NavList} from '@/lib';
import {CloudUpload} from '@/internal/Icons';

import {NavPanel} from './NavPanel.tsx';

const meta = {
    title: 'Components/NavPanel',
    component: NavPanel,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
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
} as Meta<typeof NavPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render: args => {
        return (
            <NavPanel {...args}>
                <NavList layout="horizontal">
                    <NavLink href="#" title="Hello" />
                    <NavLink icon={CloudUpload} href="#" title="Foo" isCurrent />
                    <NavLink icon={CloudUpload} href="#" title="Bar" />
                    <NavLink href="#" title="Long page name" />
                    <NavLink shift={true} icon={CloudUpload} href="#" title="Bazz" />
                </NavList>
            </NavPanel>
        );
    },
    args: {},
};
