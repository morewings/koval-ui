import {resolve} from 'path';

import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import external from '@yelo/rollup-node-external';
import dts from 'vite-plugin-dts';
import postcssPresetEnv from 'postcss-preset-env';
import svgr from 'vite-plugin-svgr';
import {kitchen} from 'alias-kitchen';

import {wrapInLayerPlugin} from './wrapInLayerPlugin';

// https://vitejs.dev/config/
export default defineConfig(({command}) => ({
    // don't bundle public directory
    publicDir: command === 'build' ? false : 'public',
    resolve: {
        alias: kitchen({recipe: 'vite'}),
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
        dts({exclude: ['**/*.stories.(ts|tsx)'], rollupTypes: true}),
    ],
    build: {
        sourcemap: true,
        cssMinify: 'esbuild',
        lib: {
            entry: resolve(__dirname, 'src/lib/index.ts'),
            name: 'KovalUI',
            // the proper extensions will be added
            fileName: (format, entryName) => {
                if (entryName === 'src/lib/index') {
                    return `index.${format === 'es' ? 'js' : 'cjs'}`;
                } else if (entryName.includes('node_modules')) {
                    return `external/module.${format === 'es' ? 'js' : 'cjs'}`;
                }
                return `${entryName}.${format === 'es' ? 'js' : 'cjs'}`;
            },
            cssFileName: 'index',
            formats: ['es', 'cjs'],
        },
        rollupOptions: {
            // make sure to externalize deps that
            // shouldn't be bundled into your library
            external: external({
                whitelist: [/^the-new-css-reset/, /^@material-symbols/, /^@phosphor-icons/],
            }),
            output: {
                // enable tree shaking
                preserveModules: true,
                // ensure Next.js compatibility
                banner: "'use client';",
            },
        },
    },
    css: {
        modules: {
            localsConvention: 'camelCase',
        },
        postcss: {
            plugins: [
                postcssPresetEnv({
                    stage: 1,
                    features: {
                        // Tell preset-env NOT to polyfill/flatten @layer rules
                        'cascade-layers': false,
                        'all-property': false,
                    },
                }),
                wrapInLayerPlugin(),
            ],
        },
    },
}));
