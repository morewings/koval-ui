import {useGlobals as useGlobalsManager} from '@storybook/manager-api';
import {useGlobals as useGlobalsPreview} from '@storybook/preview-api';
import {useCallback} from 'react';

import type {ThemeConfigType} from './types.ts';

export const useGlobalThemesManager = (): {
    themes?: ThemeConfigType[];
    selectedTheme?: string;
    setSelectedTheme: (nextTheme: string) => void;
} => {
    const [{themes, selectedTheme}, updateGlobals] = useGlobalsManager();

    const setSelectedTheme = useCallback(
        (nextTheme: string) => {
            updateGlobals({selectedTheme: nextTheme});
        },
        [updateGlobals]
    );

    return {themes, setSelectedTheme, selectedTheme};
};

export const useGlobalThemesPreview = (): {
    selectedTheme?: string;
    themes?: ThemeConfigType[];
} => {
    const [{themes, selectedTheme}] = useGlobalsPreview();

    return {themes, selectedTheme};
};
