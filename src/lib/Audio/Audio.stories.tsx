import type {Meta, StoryObj} from '@storybook/react';
// import {fn} from '@storybook/test';

import {Audio} from './Audio.tsx';
import audioFile from './sample.mp3';
import posterFile from './poster.jpeg';

const meta = {
    title: 'Components/Audio',
    component: Audio,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        // layout: 'centered',
        layout: 'fullscreen',
    },
    args: {
        title: 'Sons of AI - Koval Revolution',
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
        sources: {
            table: {
                disable: true,
            },
        },
        onReady: {
            table: {
                disable: true,
            },
        },
        onError: {
            table: {
                disable: true,
            },
        },
        onPause: {
            table: {
                disable: true,
            },
        },
        onPlay: {
            table: {
                disable: true,
            },
        },
        poster: {
            options: ['noPoster', 'withPoster'], // An array of serializable values
            mapping: {
                noPoster: undefined,
                withPoster: posterFile,
            },
            control: {
                type: 'radio',
                labels: {
                    noPoster: 'No poster',
                    withPoster: 'With poster',
                },
            },
        },
    },
} as Meta<typeof Audio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    name: 'With src',
    render: args => {
        return <Audio {...args} />;
    },
    args: {
        src: audioFile,
    },
};

export const SrcList: Story = {
    name: 'With sources list',
    render: args => {
        return <Audio {...args} />;
    },
    args: {
        sources: [
            {
                src: audioFile,
            },
        ],
    },
};
