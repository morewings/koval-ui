import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';

import type {Props} from './Iframe.tsx';
import {Iframe} from './Iframe.tsx';

const meta = {
    title: 'Embeds & IFrame/Iframe',
    component: Iframe,
    parameters: {
        layout: 'fullsreen',
        chromatic: {disableSnapshot: true},
    },
    args: {
        onLoad: fn(),
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
type Story = StoryObj<Props>;

export const Primary: Story = {
    name: 'Basic demo',
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
        permissionsConfig: {
            accelerometer: true,
            autoplay: true,
            'clipboard-write': true,
            'encrypted-media': true,
            gyroscope: true,
            'picture-in-picture': true,
            'web-share': true,
        },
        sandboxConfig: {
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

export const WithFullPermissions: Story = {
    name: 'Demo with all permissions',
    render: args => {
        return <Iframe {...args} />;
    },
    parameters: {
        controls: {include: ['permissionsConfig', 'sandboxConfig', 'src']},
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
        permissionsConfig: {
            accelerometer: true,
            'ambient-light-sensor': true,
            'attribution-reporting': true,
            autoplay: true,
            bluetooth: true,
            'browsing-topics': true,
            camera: true,
            'clipboard-write': true,
            'compute-pressure': true,
            'display-capture': true,
            'document-domain': true,
            'encrypted-media': true,
            fullscreen: true,
            gamepad: true,
            geolocation: true,
            gyroscope: true,
            hid: true,
            'identity-credentials-get': true,
            'idle-detection': true,
            'local-fonts': true,
            magnetometer: true,
            microphone: true,
            midi: true,
            'otp-credentials': true,
            payment: true,
            'picture-in-picture': true,
            'publickey-credentials-create': true,
            'publickey-credentials-get': true,
            'screen-wake-lock': true,
            serial: true,
            'speaker-selection': true,
            'storage-access': true,
            usb: true,
            'web-share': true,
            'window-management': true,
            'xr-spatial-tracking': true,
        },
        sandboxConfig: {
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
