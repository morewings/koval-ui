import type {FC, ElementType, HTMLAttributes} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';

import {DefaultIcon} from './DefaultIcon.tsx';
import classes from './NavList.module.css';

enum LinkTypes {
    default = 'default',
    success = 'success',
    link = 'link',
    danger = 'danger',
}

export type Props = DataAttributes &
    LibraryProps & {
        type?: keyof typeof LinkTypes;
        title: string;
        href: string;
        as?: ElementType<{href: any}>; //eslint-disable-line @typescript-eslint/no-explicit-any
        icon?: FC<HTMLAttributes<HTMLOrSVGElement> & unknown>;
        shift?: boolean;
    };

export const NavLink: FC<Props> = ({
    title,
    as: Component = 'a',
    href,
    icon,
    shift = false,
    className,
    type = LinkTypes.default,
    ...nativeProps
}) => {
    const Icon = icon ?? DefaultIcon;
    return (
        <Component
            {...nativeProps}
            title={title}
            className={classNames(
                classes.navLink,
                {
                    [classes.shift]: shift,
                    [classes.success]: type === LinkTypes.success,
                    [classes.default]: type === LinkTypes.default,
                    [classes.link]: type === LinkTypes.link,
                    [classes.danger]: type === LinkTypes.danger,
                },
                className
            )}
            href={href}>
            {Icon && <span>{<Icon className={classes.navLinkIcon} title={title} />}</span>}
            <span className={classes.navLinkTitle}>{title}</span>
        </Component>
    );
};
