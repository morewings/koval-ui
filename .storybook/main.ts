import type { StorybookConfig,  } from '@storybook/react-vite';
import { withoutVitePlugins } from '@storybook/builder-vite';

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-storysource',
    ],

    framework: {
        name: '@storybook/react-vite',
        options: {},
    },

    docs: {},

    core: {
        disableTelemetry: true,
    },

    typescript: {
        reactDocgen: 'react-docgen-typescript'
    },

    async viteFinal(config) {
        return {
            ...config,
            plugins: await withoutVitePlugins(config.plugins, ['vite:dts']),
        }
    },
};

export default config;
