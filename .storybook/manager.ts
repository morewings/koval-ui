import {addons, types} from '@storybook/manager-api';
import {STORY_CHANGED, STORY_ERRORED, STORY_MISSING} from '@storybook/core-events';
import ReactGA from 'react-ga4';

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
    ReactGA.initialize('G-RKLSD9625E');

    api.on(STORY_CHANGED, () => {
        const {path, storyId} = api.getUrlState();
        ReactGA.send({hitType: 'pageview', page: path, title: storyId});
    });
    api.on(STORY_ERRORED, () => {
        const {path, storyId} = api.getUrlState();
        ReactGA.send({hitType: 'exception', page: path, title: storyId, fatal: true});
    });
    api.on(STORY_MISSING, (id: string) => {
        const {path} = api.getUrlState();
        ReactGA.send({hitType: 'exception', page: path, title: id, fatal: true});
    });
});
