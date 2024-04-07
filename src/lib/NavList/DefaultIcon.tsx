import type {FC, HTMLAttributes} from 'react';

import classes from '@/lib/NavList/NavList.module.css';

export const DefaultIcon: FC<HTMLAttributes<HTMLOrSVGElement>> = ({title}) => {
    return <div className={classes.defaultIcon}>{title?.charAt(0)}</div>;
};
