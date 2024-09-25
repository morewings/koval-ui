import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';

import {Video} from './Video.tsx';
import poster from './poster.jpg';

const meta = {
    title: 'Components/Video',
    component: Video,
    parameters: {
        layout: 'fullscreen',
    },
    args: {
        width: 720,
        height: 405,
        title: 'Big Buck Bunny',
        poster: poster,
        loop: false,
        muted: false,
        autoPlay: false,
        enablePictureInPicture: true,
        enableFullscreen: true,
        showControls: true,
        showTitle: true,
        preload: 'auto',
        onCanPlay: fn(),
        onReady: fn(),
        onError: fn(),
        onPlay: fn(),
        onPause: fn(),
    },
    argTypes: {
        width: {
            control: 'number',
        },
        src: {
            table: {
                disable: true,
            },
        },
        sources: {
            table: {
                disable: true,
            },
        },
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
        onCanPlay: {
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
        onPlay: {
            table: {
                disable: true,
            },
        },
        onPause: {
            table: {
                disable: true,
            },
        },
    },
} as Meta<typeof Video>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    name: 'Single source example',
    render: args => {
        return <Video {...args} />;
    },
    args: {
        // @ts-expect-error TODO: some strange type issue with mutually exclusive props
        src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    },
};

export const Sources: Story = {
    name: 'Sources list example',
    render: args => {
        return <Video {...args} />;
    },
    args: {
        // @ts-expect-error TODO: some strange type issue with mutually exclusive props
        sources: [
            {
                src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                type: 'video/mp4',
            },
        ],
    },
};
