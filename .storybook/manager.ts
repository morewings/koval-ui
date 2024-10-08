import {addons, types} from '@storybook/manager-api';

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
