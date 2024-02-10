import type {FC, ReactNode} from 'react';

import classes from './Dialog.module.css';

export const DialogHeader: FC<{children?: ReactNode}> = ({children}) => {
    return <header className={classes.header}>{children}</header>;
};
