import type {FC, ReactNode} from 'react';

import classes from './Layout.module.css';

export type Props = {
    children?: ReactNode;
};

export const Main: FC<Props> = ({children}) => {
    return <main className={classes.main}>{children}</main>;
};
