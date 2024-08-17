import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';

import {Iframe} from './Iframe.tsx';

const meta = {
    title: 'Components/Iframe',
    component: Iframe,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullsreen',
    },
    args: {
        onLoad: fn(),
        showBorder: false,
    },
    argTypes: {
        className: {
            table: {
                disable: true,
            },
        },
        onLoad: {
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
} as Meta<typeof Iframe>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render: args => {
        return <Iframe {...args} />;
    },
    args: {
        src: 'https://www.youtube.com/embed/dQw4w9WgXcQ?si=dFPV1emazW5GQntR',
        width: 560,
        height: 315,
        referrerPolicy: 'strict-origin-when-cross-origin',
        allowFullScreen: true,
        name: 'rickroll',
        title: 'YouTube video player',
        loading: 'lazy',
        permissions: {
            accelerometer: true,
            autoplay: true,
            'clipboard-write': true,
            'encrypted-media': true,
            gyroscope: true,
            'picture-in-picture': true,
            'web-share': true,
        },
        sandbox: {
            'allow-downloads': true,
            'allow-downloads-without-user-activation': true,
            'allow-forms': true,
            'allow-modals': true,
            'allow-orientation-lock': true,
            'allow-pointer-lock': true,
            'allow-popups': true,
            'allow-popups-to-escape-sandbox': true,
            'allow-presentation': true,
            'allow-same-origin': true,
            'allow-scripts': true,
            'allow-storage-access-by-user-activation': true,
            'allow-top-navigation': true,
            'allow-top-navigation-by-user-activation': true,
            'allow-top-navigation-to-custom-protocols': true,
        },
    },
};
