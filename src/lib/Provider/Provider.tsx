import type {FC, ReactNode} from 'react';
import {RootThemeProvider} from 'css-vars-hook';

import {theme as themeGeneric} from '@/lib/Theme';

export const Provider: FC<{children?: ReactNode; theme?: typeof themeGeneric}> = ({children, theme = themeGeneric}) => {
    return <RootThemeProvider theme={theme}>{children}</RootThemeProvider>;
};
