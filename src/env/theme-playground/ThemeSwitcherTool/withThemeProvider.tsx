import type {FC, ReactNode} from 'react';
// @ts-expect-error TODO: maybe fix later
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {useState, useCallback, useEffect} from 'react';
import {useChannel} from '@storybook/preview-api';

import type {PublicThemeType} from './../../../lib/Theme';
import {EVENTS} from '../constants';
import {useGlobalThemesPreview} from './../useGlobalThemes.ts';

export const withThemeProvider =
    (Provider: FC<{children?: ReactNode; theme?: PublicThemeType}>) =>
    // eslint-disable-next-line react/display-name
    (Story: FC) => {
        const {themes = [], selectedTheme} = useGlobalThemesPreview();
        const vanillaTheme = themes.find(
            ({name}) => Boolean(selectedTheme) && name === selectedTheme
        )?.themeObject;
        const [tweakTheme, setTweakTheme] = useState({});

        const handleThemeChange = useCallback((nextTheme: Record<string, string>) => {
            setTweakTheme(nextTheme);
        }, []);

        const emit = useChannel({
            [EVENTS.SET_THEME]: handleThemeChange,
        });

        useEffect(() => {
            emit(EVENTS.RESET_THEME);
        }, [emit, selectedTheme]);

        return (
            <Provider theme={{...vanillaTheme, ...tweakTheme}}>
                <Story />
            </Provider>
        );
    };
