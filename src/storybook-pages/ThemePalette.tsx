import type {FC} from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import {ColorPalette, ColorItem} from '@storybook/blocks';

import type {PublicThemeType} from '@/lib/Theme';

export const ThemePalette: FC<{theme: PublicThemeType}> = ({theme}) => {
    return (
        <ColorPalette>
            <ColorItem
                title="Main colors"
                subtitle="Named after music notes"
                colors={{
                    Do: theme.colorDo as string,
                    Re: theme.colorRe as string,
                    Mi: theme.colorMi as string,
                }}
            />
            <ColorItem
                title="Secondary colors"
                subtitle="Create contrast for main colors"
                colors={{
                    Fa: theme.colorFa as string,
                    Sol: theme.colorSol as string,
                    La: theme.colorLa as string,
                }}
            />
            <ColorItem
                title="Info colors"
                subtitle="Provide user information via color stereotype"
                colors={{
                    Success: theme.colorSuccess as string,
                    Action: theme.colorAction as string,
                    Warning: theme.colorWarning as string,
                    Error: theme.colorError as string,
                }}
            />
            <ColorItem title="Text color" subtitle="" colors={{Text: theme.textColor as string}} />
            <ColorItem
                title="Background colors"
                subtitle="Contrast and elevations"
                colors={{
                    background000: theme.background000 as string,
                    background100: theme.background100 as string,
                    background200: theme.background200 as string,
                    background300: theme.background300 as string,
                    background400: theme.background400 as string,
                    background500: theme.background500 as string,
                    background600: theme.background600 as string,
                }}
            />
        </ColorPalette>
    );
};
