import type { Preview } from '@storybook/react';
import {Provider} from './../src/lib/Provider/index.ts';

import 'the-new-css-reset/css/reset.css';

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
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
