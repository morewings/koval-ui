import type {FC} from 'react';
// @ts-expect-error TODO: maybe fix later
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import {ListItem, TooltipMessage} from '@storybook/components';

import type {ThemeConfigType} from '../types';
import {useGlobalThemesManager} from '../useGlobalThemes';
import {Color} from './Color';

export const ThemeList: FC<{
    themes?: ThemeConfigType[];
    onSelect: (name: string) => void;
}> = ({themes, onSelect}) => {
    const {selectedTheme} = useGlobalThemesManager();
    const hasConfig = Boolean(themes) && Array.isArray(themes) && Boolean(selectedTheme);
    return hasConfig ? (
        <div>
            {themes.map(({name, color}) => {
                return (
                    <ListItem
                        active={selectedTheme === name}
                        onClick={() => {
                            selectedTheme !== name && onSelect(name);
                        }}
                        key={name}
                        title={name}
                        right={<Color colorName={color} />}
                    />
                );
            })}
        </div>
    ) : (
        <TooltipMessage
            title="Missing theme config"
            desc="Add themes list and selected theme to .storybook/preview.js"
        />
    );
};
