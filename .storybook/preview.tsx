import type {Preview} from '@storybook/react';
// import {withThemeProvider} from 'storybook-addon-theme-provider';

import {theme as themePodil} from '../src/lib/Theme/themePodil';
import {theme as themeDnipro} from '../src/lib/Theme/themeDnipro';
import {Provider} from './../src/lib/Provider/Provider';
import {withThemeProvider} from './../src/env/theme-playground/ThemeSwitcherTool';

import '@/lib/CSSReset/reset.css';

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
                method: 'alphabetical',
                order: [
                    'Intro',
                    'Theme',
                    'Layout',
                    ['Intro'],
                    'Inputs',
                    ['Intro'],
                    'Typography',
                    ['Intro'],
                    'Components',
                    ['Intro'],
                ],
            },
        },
        viewport: {viewports: customViewports},
    },

    decorators: [withThemeProvider(Provider)],

    initialGlobals: {
        // Set initially selected theme name
        selectedTheme: 'Podil',
        // Provide a list of available themes
        themes: [
            {
                // Provide a name for the theme.
                name: 'Podil',
                // Set a color to display after theme name
                color: '#e3a075',
                // Provide object with foo theme data
                themeObject: themePodil,
            },
            {
                name: 'Dnipro',
                color: '#20b2aa',
                themeObject: themeDnipro,
            },
        ],
    },
};

export default preview;
