import type {FC, ReactNode} from 'react';

import classes from './Layout.module.css';

export type Props = {
    children?: ReactNode;
};

export const Sidebar: FC<Props> = ({children}) => {
    return <aside className={classes.aside}>{children}</aside>;
};
