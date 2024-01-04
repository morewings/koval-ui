import type {FC, ReactNode} from 'react';

import classes from './Layout.module.css';

export type Props = {
    children?: ReactNode;
};

export const Content: FC<Props> = ({children}) => {
    return <div className={classes.content}>{children}</div>;
};
