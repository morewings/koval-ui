import type {FC, ReactNode} from 'react';

import classes from './ContainerFill.module.css';

export const ContainerFill: FC<{children: ReactNode}> = ({children}) => {
    return (
        <div className={classes.fill}>
            <div className={classes.text}>{children}</div>
        </div>
    );
};
