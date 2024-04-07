import type {FC} from 'react';

import type {Props as NavLinkProps} from './NavLink.tsx';
import classes from './NavList.module.css';
import {DefaultIcon} from './DefaultIcon.tsx';

export const NavLinkCompact: FC<NavLinkProps> = ({as: Component = 'a', icon, title, ...nativeProps}) => {
    const Icon = icon ?? DefaultIcon;
    return (
        <Component {...nativeProps}>
            {Icon && <span>{<Icon className={classes.navLinkIcon} title={title} />}</span>}
        </Component>
    );
};
