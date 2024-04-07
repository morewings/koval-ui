import type {Meta, StoryObj} from '@storybook/react';
import {useMemo} from 'react';

import {IconFile, CloudUpload} from '@/internal/Icons';

import {NavList} from './NavList.tsx';
import {NavLink} from './NavLink.tsx';

const meta = {
    title: 'Components/NavList',
    component: NavList,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    args: {
        mode: 'full',
        bordered: true,
        variant: 'vertical',
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
    },
} as Meta<typeof NavList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render: args => {
        const parentSize = useMemo(() => {
            return args.variant === 'vertical' ? {height: 666} : {width: 999};
        }, [args]);
        return (
            <div style={parentSize}>
                <NavList {...args}>
                    <NavLink title="Foo" href="#" icon={IconFile} />
                    <NavLink title="Bar" type="success" href="#" />
                    <NavLink title="Bazz" type="link" href="#" icon={CloudUpload} />
                    <NavLink title="Wery Longer name" href="#" />
                    <NavLink title="Shifted" shift={true} href="#" icon={CloudUpload} />
                </NavList>
            </div>
        );
    },
    args: {},
};
