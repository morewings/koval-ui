import type {FC, ReactNode} from 'react';
import {RootThemeProvider} from 'css-vars-hook';

export const Provider: FC<{children?: ReactNode}> = ({children}) => {
    return <RootThemeProvider theme={{}}>{children}</RootThemeProvider>;
};
