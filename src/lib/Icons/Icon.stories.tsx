import type {Meta, StoryObj} from '@storybook/react';
import Face from '@material-symbols/svg-400/sharp/face.svg?react';

import {Icon} from './Icon';

const meta = {
    title: 'Icons/Demo',
    component: Icon,
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
        return <Icon {...args} />;
    },
    args: {
        children: <Face />,
    },
    parameters: {
        docs: {
            source: {language: 'tsx', type: 'code'},
        },
    },
};
