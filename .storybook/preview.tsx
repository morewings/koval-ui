import type { Preview } from '@storybook/react';
import {Provider} from './../src/lib/Provider/index.ts';

import 'the-new-css-reset/css/reset.css';

const customViewports = {
    viewportXS: {
        name: 'viewport-xs: 320×568',
        styles: {
            width: '320px',
            height: '568px',
        },
    },
    viewportSM: {
        name: 'viewport-sm: 640×960',
        styles: {
            width: '640px',
            height: '960px',
        },
    },
    viewportMD: {
        name: 'viewport-md: 992×1194',
        styles: {
            width: '992px',
            height: '1194px',
        },
    },
    viewportLG: {
        name: 'viewport-lg: 1366×768',
        styles: {
            width: '1366px',
            height: '768px',
        },
    },
    viewportXL: {
        name: 'viewport-xl: 1920×1080',
        styles: {
            width: '1920px',
            height: '1080px',
        },
    },
};

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        options: {
            storySort: {
                order: ['Intro', 'Layout', 'Inputs', 'Typography', 'Components'],
            },
        },
        viewport: { viewports: customViewports },
    },

    decorators: [
        (Story) => (
            <Provider>
                <Story />
            </Provider>
        ),
    ],
};

export default preview;
