import type {Meta, StoryObj} from '@storybook/react-vite';
import {fn} from 'storybook/test';

import {Video} from './Video.tsx';
import poster from './poster.png';
import webmVideo from './dub.webm';
import mp4Video from './dub.mp4';

const meta = {
    title: 'Embeds & IFrame/Video',
    component: Video,
    parameters: {
        layout: 'fullscreen',
    },
    args: {
        width: 1280,
        height: 720,
        title: 'Sons of AI - Koval in the Code',
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
        src: webmVideo,
    },
};

export const Sources: Story = {
    name: 'Sources list example',
    render: args => {
        return <Video {...args} />;
    },
    args: {
        sources: [
            {
                src: webmVideo,
                type: 'video/webm',
            },
            {
                src: mp4Video,
                type: 'video/mp4',
            },
        ],
    },
};
