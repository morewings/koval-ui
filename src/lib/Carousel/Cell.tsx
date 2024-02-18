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

    /**
     * Has to be empty array to avoid rerenders.
     * TODO: investigate css-vars-hook
     */
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
    const LocalRootMemoized = useMemo(() => LocalRoot, []);

    return (
        <LocalRootMemoized theme={theme} className={classes.cell}>
            {children}
        </LocalRootMemoized>
    );
};
