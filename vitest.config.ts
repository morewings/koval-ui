import {defineConfig} from 'vitest/config';
import {playwright} from '@vitest/browser-playwright';
import react from '@vitejs/plugin-react';
import {kitchen} from 'alias-kitchen';

export default defineConfig({
    plugins: [react()],
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
        ],
    },
});
