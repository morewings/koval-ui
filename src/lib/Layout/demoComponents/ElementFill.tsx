import {useMemo} from 'react';
import type {FC, ReactNode} from 'react';
import {useLocalTheme} from 'css-vars-hook';

import classes from './ElementFill.module.css';

export const ElementFill: FC<{children: ReactNode; color?: string}> = ({
    children,
    color = 'pink',
}) => {
    const {LocalRoot} = useLocalTheme();
    const theme = useMemo(() => ({color}), [color]);
    return (
        <LocalRoot theme={theme} className={classes.fill}>
            <div className={classes.text}>{children}</div>
        </LocalRoot>
    );
};
