import type {FC, ReactNode} from 'react';
import classNames from 'classnames';

import classes from './Layout.module.css';

export type Props = {
    children?: ReactNode;
    sticky?: boolean;
};

export const Header: FC<Props> = ({children, sticky = true}) => {
    return <header className={classNames(classes.header, {[classes.sticky]: sticky})}>{children}</header>;
};
