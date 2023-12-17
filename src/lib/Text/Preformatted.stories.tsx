import type {Meta, StoryObj} from '@storybook/react';
// import {fn} from '@storybook/test';

import {Pre} from './Preformatted.tsx';

const meta = {
    title: 'Typography/Preformatted',
    component: Pre,
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
} as Meta<typeof Pre>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render: args => {
        return (
            <Pre {...args}>
                {`return (
    <a {...nativeProps} href={href} className={classNames(classes.link, className)} ref={ref}>
        {children}
    </a>
);`}
            </Pre>
        );
    },
    args: {},
};
