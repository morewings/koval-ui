import type {Preview} from '@storybook/react';
// import {withThemeProvider} from 'storybook-addon-theme-provider';

import {theme as themePodil} from '../src/lib/Theme/themePodil';
import {theme as themeDnipro} from '../src/lib/Theme/themeDnipro';
import {theme as themeDovzhenko} from '../src/lib/Theme/themeDovzhenko';
import {Provider} from './../src/lib/Provider/Provider';
import {withThemeProvider} from './../src/env/theme-playground/ThemeSwitcherTool';

import '@/lib/CSS/styles.css';

const customViewports = {
    viewportXS: {
        name: '📱viewport-xs: 320×568',
        styles: {
            width: '320px',
            height: '568px',
        },
    },
    viewportSM: {
        name: 'viewport-sm: 768×1024',
        styles: {
            width: '768px',
            height: '1024px',
        },
    },
    viewportMD: {
        name: 'viewport-md: 1024×768',
        styles: {
            width: '1024px',
            height: '768px',
        },
    },
    viewportLG: {
        name: 'viewport-lg: 1440×900',
        styles: {
            width: '1440px',
            height: '900px',
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
                    ['Description'],
                    'Inputs',
                    ['Description'],
                    'Typography',
                    ['Description'],
                    'Embeds & IFrame',
                    ['Description'],
                    'Components',
                    ['Description'],
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
            {
                name: 'Dovzhenko',
                color: '#6e6e6e',
                themeObject: themeDovzhenko,
            },
        ],
    },
};

export default preview;
