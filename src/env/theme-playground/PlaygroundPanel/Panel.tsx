import type {FC} from 'react';
// @ts-expect-error TODO: maybe fix later
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {useCallback, useEffect} from 'react';
import {useChannel} from '@storybook/manager-api';
import {AddonPanel, ActionBar} from '@storybook/components';
import {useAddonState} from '@storybook/manager-api';
import type {Addon_RenderOptions} from '@storybook/types';

import {useGlobalThemesManager} from './../useGlobalThemes.ts';
import {EVENTS} from '../constants';
import {Playground} from './Playground';
import {ADDON_ID} from '../constants';

export const Panel: FC<Partial<Addon_RenderOptions>> = props => {
    const [theme, setTheme] = useAddonState(ADDON_ID, {});

    const {themes, selectedTheme} = useGlobalThemesManager();

    const vanillaTheme = themes?.find(
        ({name}) => Boolean(selectedTheme) && name === selectedTheme
    )?.themeObject;

    const handleThemeReset = useCallback(() => {
        setTheme({});
    }, [setTheme]);

    const emit = useChannel({[EVENTS.RESET_THEME]: handleThemeReset});

    useEffect(() => {
        emit(EVENTS.SET_THEME, theme);
    }, [emit, theme]);

    const handleColorChange = useCallback(
        (change: Record<string, string>) => {
            change && setTheme({...theme, ...change});
        },
        [setTheme, theme]
    );

    const handleBackgroundInvert = useCallback((nextBgColors: object) => {
        console.log('invert', nextBgColors);
    }, []);

    const handleReset = useCallback(() => {
        emit(EVENTS.RESET_THEME);
    }, [emit]);

    return (
        <AddonPanel active={Boolean(props.active)}>
            <div>
                <Playground
                    vanillaTheme={vanillaTheme}
                    theme={theme}
                    onColorChange={handleColorChange}
                    onBackgroundInvert={handleBackgroundInvert}
                />
                <ActionBar
                    actionItems={[
                        // {title: 'Save theme', onClick: () => {}},
                        {title: 'Reset theme', onClick: handleReset},
                    ]}></ActionBar>
            </div>
        </AddonPanel>
    );
};
