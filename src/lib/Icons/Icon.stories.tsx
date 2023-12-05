import type {Meta, StoryObj} from '@storybook/react';
import Face from '@material-symbols/svg-400/sharp/face.svg?react';

import {Icon} from './Icon';

const meta = {
    title: 'Icons/Demo',
    component: Icon,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
    },
} as Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IconExample: Story = {
    args: {
        children: <Face />,
    },
};

export const IconSecond: Story = {
    render: args => {
        console.log('hello');
        return <Icon {...args} />;
    },
    args: {
        name: 'bar',
    },
    parameters: {
        docs: {
            source: {language: 'tsx', type: 'code'},
        },
    },
};
