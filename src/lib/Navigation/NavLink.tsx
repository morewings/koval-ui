import type {FC, ElementType, HTMLAttributes, AriaAttributes, ReactNode, ForwardedRef} from 'react';
import {forwardRef} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';

import classes from './Navigation.module.css';

export type Props = DataAttributes &
    LibraryProps & {
        title: string;
        href: string;
        as?: ElementType<
            AriaAttributes &
                DataAttributes & {
                    href: string;
                    className?: string;
                    title?: string;
                    children?: ReactNode;
                    ref?: ForwardedRef<HTMLElement>;
                } & unknown
        >;
        icon?: FC<HTMLAttributes<HTMLOrSVGElement> & unknown>;
        shift?: boolean;
        isCurrent?: boolean;
    };

export const NavLink = forwardRef<HTMLElement, Props>(
    (
        {
            title,
            as: Component = 'a',
            href,
            icon: Icon,
            shift = false,
            className,
            isCurrent,
            ...nativeProps
        },
        ref
    ) => {
        return (
            <Component
                {...nativeProps}
                ref={ref}
                title={title}
                className={classNames(
                    classes.navLink,
                    {
                        [classes.shift]: shift,
                        [classes.current]: isCurrent,
                    },
                    className
                )}
                href={href}>
                {Icon && <span>{<Icon className={classes.navLinkIcon} title={title} />}</span>}
                <span className={classes.navLinkTitle}>{title}</span>
            </Component>
        );
    }
);

NavLink.displayName = 'NavLink';
