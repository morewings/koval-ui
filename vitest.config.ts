import path from 'node:path';
import {fileURLToPath} from 'node:url';

import {defineConfig} from 'vitest/config';
import {playwright} from '@vitest/browser-playwright';
import react from '@vitejs/plugin-react';
import {kitchen} from 'alias-kitchen';
import {storybookTest} from '@storybook/addon-vitest/vitest-plugin';
import svgr from 'vite-plugin-svgr';
import postcssPresetEnv from 'postcss-preset-env';

import {wrapInLayerPlugin} from './wrapInLayerPlugin';

const dirname =
    typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
    css: {
        modules: {
            localsConvention: 'camelCase',
        },
        postcss: {
            plugins: [
                postcssPresetEnv({
                    stage: 1,
                    features: {
                        'cascade-layers': false,
                        'all-property': false,
                    },
                }),
                wrapInLayerPlugin(),
            ],
        },
    },
    plugins: [
        svgr({
            svgrOptions: {
                typescript: true,
            },
            esbuildOptions: {
                loader: 'tsx',
            },
            include: '**/*.svg?react',
        }),
        react(),
    ],
    resolve: {
        alias: kitchen({
            recipe: 'vite',
        }),
    },
    test: {
        passWithNoTests: true,
        browser: {
            screenshotFailures: false,
            headless: true,
            enabled: true,
            provider: playwright({
                launchOptions: {
                    channel: 'chromium',
                },
            }),
            // https://vitest.dev/guide/browser/playwright
            instances: [
                {
                    browser: 'chromium',
                },
            ],
        },
        projects: [
            {
                extends: true,
                test: {
                    name: 'unit',
                    globals: true,
                },
            },
            {
                extends: true,
                plugins: [
                    // The plugin will run tests for the stories defined in your Storybook config
                    // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
                    storybookTest({
                        configDir: path.join(dirname, '.storybook'),
                        storybookScript: 'pnpm run start:docs',
                    }),
                ],
                test: {
                    name: 'storybook',
                },
            },
        ],
    },
});
