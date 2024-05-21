import type {FC, ElementType, HTMLAttributes, AriaAttributes, ReactNode} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';

import classes from './Navigation.module.css';

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
        as?: ElementType<
            AriaAttributes &
                DataAttributes & {href: string; className?: string; title?: string; children?: ReactNode} & unknown
        >;
        icon?: FC<HTMLAttributes<HTMLOrSVGElement> & unknown>;
        shift?: boolean;
        isCurrent?: boolean;
    };

export const NavLink: FC<Props> = ({
    title,
    as: Component = 'a',
    href,
    icon: Icon,
    shift = false,
    className,
    type = LinkTypes.default,
    isCurrent,
    ...nativeProps
}) => {
    return (
        <Component
            {...nativeProps}
            title={title}
            className={classNames(
                classes.navLink,
                {
                    [classes.shift]: shift,
                    [classes.current]: isCurrent,
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
