import type {FC, ReactNode} from 'react';

import classes from './Cell.module.css';

export const Cell: FC<{children?: ReactNode}> = ({children}) => {
    return <div className={classes.cell}>{children}</div>;
};
