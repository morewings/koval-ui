import type {Meta, StoryObj} from '@storybook/react';
// import {fn} from '@storybook/test';

import {SkeletonFrame} from './SkeletonFrame.tsx';
import {SkeletonShape} from './SkeletonShape.tsx';
import {SkeletonText} from './SkeletonText.tsx';
import {SkeletonAction} from './SkeletonAction.tsx';

const meta = {
    title: 'Components/Skeleton',
    component: SkeletonFrame,
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
} as Meta<typeof SkeletonFrame>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    name: 'Basic',
    render: () => {
        return (
            <SkeletonFrame width={480}>
                <SkeletonShape height={240} />
                <SkeletonText />
                <SkeletonAction double={true} />
            </SkeletonFrame>
        );
    },
    args: {},
};

export const Responsive: Story = {
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
    },
    render: () => {
        return (
            <SkeletonFrame width={480}>
                <SkeletonShape height={240} />
                <SkeletonText />
                <SkeletonAction double={true} />
            </SkeletonFrame>
        );
    },
    args: {},
};
