import type {FC, ReactNode} from 'react';

import classes from './Icon.module.css';

export const Icon: FC<{children?: ReactNode}> = ({children}) => {
    return <div className={classes.icon}>{children}</div>;
};
