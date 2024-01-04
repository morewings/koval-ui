import type {FC, ReactNode} from 'react';

import classes from './Layout.module.css';

export type Props = {
    children?: ReactNode;
};

export const Footer: FC<Props> = ({children}) => {
    return <footer className={classes.footer}>{children}</footer>;
};
