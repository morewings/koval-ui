import type {ReactNode, FC} from 'react';
import {useMemo} from 'react';
import {useLocalTheme} from 'css-vars-hook';

import classes from './Carousel.module.css';

export const Cell: FC<{children?: ReactNode; index: number}> = ({children, index}) => {
    const theme = useMemo(
        () => ({
            index,
        }),
        [index]
    );
    const {LocalRoot} = useLocalTheme();

    return (
        <LocalRoot theme={theme} className={classes.cell}>
            {children}
        </LocalRoot>
    );
};
