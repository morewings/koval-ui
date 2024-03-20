import type {FC, ReactNode} from 'react';
import {RootThemeProvider} from 'css-vars-hook';

import {theme as themeGeneric} from '@/lib/Theme';
import {DialogProvider} from '@/lib/Dialog';
import {NotificationProvider} from '@/lib/Notification';

import classes from './Provider.module.css';

export type Props = {children?: ReactNode; theme?: typeof themeGeneric};

export const Provider: FC<Props> = ({children, theme = themeGeneric}) => {
    return (
        <RootThemeProvider theme={theme} className={classes.provider}>
            <DialogProvider>
                <NotificationProvider>{children}</NotificationProvider>
            </DialogProvider>
        </RootThemeProvider>
    );
};
