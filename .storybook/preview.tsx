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
        parameters: {
            layout: 'centered',
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
