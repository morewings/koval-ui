import type {Meta, StoryObj} from '@storybook/react';
import {Fragment} from 'react';
// import {fn} from '@storybook/test';

import {H1, H2, H3, H5, H4, H6} from './Headers.tsx';

const meta = {
    title: 'Typography/Header',
    component: H1,
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
    },
} as Meta<typeof H1>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    name: 'Demo',
    render: args => {
        return (
            <Fragment>
                <H1 {...args}>Header 1</H1>
                <H2 {...args}>Header 2</H2>
                <H3 {...args}>Header 3</H3>
                <H4 {...args}>Header 4</H4>
                <H5 {...args}>Header 5</H5>
                <H6 {...args}>Header 6</H6>
            </Fragment>
        );
    },
    args: {},
};
