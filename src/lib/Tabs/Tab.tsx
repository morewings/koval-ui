import type {FC, HTMLAttributes, ReactNode} from 'react';

import classes from './Tabs.module.css';

export type Props = {
    name: string;
    children: ReactNode;
    icon?: FC<HTMLAttributes<HTMLOrSVGElement> & unknown>;
};

export const Tab: FC<Props> = ({children}) => {
    return <div className={classes.tab}>{children}</div>;
};
