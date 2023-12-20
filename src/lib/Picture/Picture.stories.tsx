import type {Meta, StoryObj} from '@storybook/react';
// import {fn} from '@storybook/test';

import {Picture} from './Picture.tsx';

const meta = {
    title: 'Components/Picture',
    component: Picture,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    args: {},
    argTypes: {
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
        className: {
            table: {
                disable: true,
            },
        },
    },
} as Meta<typeof Picture>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render: function Render(args) {
        return <Picture {...args} />;
    },
    args: {
        src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-images/painted-hand-298-332.jpg',
        width: 298,
        height: 332,
        alt: 'Image description',
        sources: [
            {
                src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-images/surfer-240-200.jpg',
                mediaCondition: '(orientation: portrait)',
            },
        ],
    },
};

export const WithCode: Story = {
    render: args => {
        // here comes the code
        return <Picture {...args} />;
    },
};

WithCode.args = {
    id: 'foo',
};

WithCode.argTypes = {};

WithCode.parameters = {
    docs: {
        source: {
            language: 'tsx',
            type: 'code',
        },
    },
};
