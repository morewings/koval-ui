import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';

import {Picture} from '@/lib/Picture';
import {Figure} from '@/lib/Figure';

import {Carousel} from './Carousel.tsx';

const meta = {
    title: 'Components/Carousel',
    component: Carousel,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
    },
    args: {
        onRotate: fn(),
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
        onRotate: {
            table: {
                disable: true,
            },
        },
    },
} as Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render: args => {
        return (
            <Carousel {...args}>
                <Picture
                    src="https://picsum.photos/666/333?1"
                    width={666}
                    height={333}
                    alt="Image description"
                />
                <Picture
                    src="https://picsum.photos/666/333?2"
                    width={666}
                    height={333}
                    alt="Image description"
                />
                <Picture
                    src="https://picsum.photos/666/333?3"
                    width={666}
                    height={333}
                    alt="Image description"
                />
                <Picture
                    src="https://picsum.photos/666/333?4"
                    width={666}
                    height={333}
                    alt="Image description"
                />
                <Picture
                    src="https://picsum.photos/666/333?5"
                    width={666}
                    height={333}
                    alt="Image description"
                />
                <Picture
                    src="https://picsum.photos/666/333?6"
                    width={666}
                    height={333}
                    alt="Image description"
                />
            </Carousel>
        );
    },
    args: {
        width: 666,
        height: 333,
        defaultVisible: 0,
        showDots: true,
        showArrows: true,
    },
};

export const ComplexContent: Story = {
    render: args => {
        return (
            <Carousel {...args}>
                <Figure caption="Image #1">
                    <Picture
                        src="https://picsum.photos/666/360?1"
                        width={666}
                        height={360}
                        alt="Image description"
                    />
                </Figure>
                <Figure caption="Image #2">
                    <Picture
                        src="https://picsum.photos/666/360?2"
                        width={666}
                        height={360}
                        alt="Image description"
                    />
                </Figure>
                <Figure caption="Image #3">
                    <Picture
                        src="https://picsum.photos/666/360?3"
                        width={666}
                        height={360}
                        alt="Image description"
                    />
                </Figure>
                <Figure caption="Image #4">
                    <Picture
                        src="https://picsum.photos/666/360?4"
                        width={666}
                        height={360}
                        alt="Image description"
                    />
                </Figure>
                <Figure caption="Image #5">
                    <Picture
                        src="https://picsum.photos/666/360?5"
                        width={666}
                        height={360}
                        alt="Image description"
                    />
                </Figure>
                <Figure caption="Image #6">
                    <Picture
                        src="https://picsum.photos/666/360?6"
                        width={666}
                        height={360}
                        alt="Image description"
                    />
                </Figure>
            </Carousel>
        );
    },
    args: {
        width: 666,
        height: 420,
        defaultVisible: 0,
        showDots: true,
        showArrows: true,
    },
};
