import type {FC, HTMLAttributes, ReactNode} from 'react';

import classes from './Tabs.module.css';

export type Props = {
    /** Set a unique name for the Tab */
    name: string;
    children: ReactNode;
    /** Provide an icon to display near Tab name */
    icon?: FC<HTMLAttributes<HTMLOrSVGElement> & unknown>;
};

export const Tab: FC<Props> = ({children}) => {
    return <div className={classes.tab}>{children}</div>;
};
