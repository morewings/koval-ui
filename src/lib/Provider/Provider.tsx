import type {FC, ReactNode} from 'react';
import {useMemo} from 'react';
import {RootThemeProvider} from 'css-vars-hook';

import type {PublicThemeType} from '@/lib/Theme';
import {theme, themePodil} from '@/lib/Theme';
import {DialogProvider} from '@/lib/Dialog';
import {NotificationProvider} from '@/lib/Notification';
import {ToastProvider} from '@/lib/Toast';
import {DrawerProvider} from '@/lib/Drawer';
import {convertTheme} from '@/internal/utils/convertThemeVarName.ts';

import classes from './Provider.module.css';

export type Props = {
    children?: ReactNode;
    /** Provide an object with theme colors and sizes parameters */
    theme?: PublicThemeType;
};

export const Provider: FC<Props> = ({children, theme: themeProp = themePodil}) => {
    const normalizedTheme = useMemo(() => {
        return convertTheme({...theme, ...themeProp});
    }, [themeProp]);
    return (
        <RootThemeProvider theme={normalizedTheme} className={classes.provider}>
            <DialogProvider>
                <NotificationProvider>
                    <ToastProvider>
                        <DrawerProvider>{children}</DrawerProvider>
                    </ToastProvider>
                </NotificationProvider>
            </DialogProvider>
        </RootThemeProvider>
    );
};
