// @ts-expect-error TODO: maybe fix later
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {memo, useCallback} from 'react';
import {IconButton, WithTooltipPure} from '@storybook/components';
import {MirrorIcon} from '@storybook/icons';

import {TOOL_ID} from '../constants';
import {ThemeList} from './ThemeList';
import {useGlobalThemesManager} from '../useGlobalThemes';

export const ThemeSwitcherTool = memo(function MyAddonSelector() {
    const {themes, setSelectedTheme} = useGlobalThemesManager();

    const handleSelect = useCallback(
        (name: string) => {
            setSelectedTheme(name);
        },
        [setSelectedTheme]
    );

    return (
        <WithTooltipPure tooltip={<ThemeList onSelect={handleSelect} themes={themes} />}>
            <IconButton key={TOOL_ID} title="Switch theme">
                <MirrorIcon />
            </IconButton>
        </WithTooltipPure>
    );
});
