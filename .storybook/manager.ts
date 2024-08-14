import {addons, types} from '@storybook/manager-api';
import {STORY_CHANGED, STORY_ERRORED, STORY_MISSING} from '@storybook/core-events';
import ReactGA from 'react-ga';

import {TOOL_ID, PANEL_ID, ADDON_ID} from '../src/env/theme-playground/constants';
import {ThemeSwitcherTool} from '../src/env/theme-playground/ThemeSwitcherTool';
import {Panel} from '../src/env/theme-playground/PlaygroundPanel';
import kovalTheme from './kovalTheme';

addons.setConfig({
    theme: kovalTheme,
});

// Register the addon
addons.register(ADDON_ID, () => {
    // Register the tool
    addons.add(TOOL_ID, {
        type: types.TOOL,
        title: 'Theme provider',
        match: ({viewMode}) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
        render: ThemeSwitcherTool,
    });

    // Register the panel
    addons.add(PANEL_ID, {
        type: types.PANEL,
        title: 'Theme playground',
        match: ({viewMode}) => viewMode === 'story',
        render: Panel,
    });
});

addons.register('storybook/google-analytics', api => {
    //@ts-expect-error window
    ReactGA.initialize(window.STORYBOOK_GA_ID, window.STORYBOOK_REACT_GA_OPTIONS);

    api.on(STORY_CHANGED, () => {
        const {path} = api.getUrlState();
        ReactGA.pageview(path);
    });
    api.on(STORY_ERRORED, ({description}: {description: string}) => {
        ReactGA.exception({
            description,
            fatal: true,
        });
    });
    api.on(STORY_MISSING, (id: string) => {
        ReactGA.exception({
            description: `attempted to render ${id}, but it is missing`,
            fatal: false,
        });
    });
});

/* eslint-disable ssr-friendly/no-dom-globals-in-module-scope */
//@ts-expect-error window
window.STORYBOOK_GA_ID = 'G-RKLSD9625E';
//@ts-expect-error window
window.STORYBOOK_REACT_GA_OPTIONS = {};
/* eslint-enable ssr-friendly/no-dom-globals-in-module-scope */
