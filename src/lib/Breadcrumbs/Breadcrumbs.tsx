import type {FC, HTMLAttributes, ReactNode, JSX} from 'react';
import {forwardRef} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';

import classes from './Breadcrumbs.module.css';

type Item = {
    name: string;
    url: string;
    icon?: FC<HTMLAttributes<HTMLOrSVGElement> & unknown>;
};

type LinkProps = {
    href: string;
    title?: string;
    className?: string;
    children?: ReactNode;
};

export type Props = DataAttributes &
    LibraryProps & {
        children?: ReactNode;
        /** Provide a list of items to render inside breadcrumbs */
        items: Item[];
        /** Enable to show ellipsis (...) after the first breadcrumb item */
        showEllipsis?: boolean;
        /**
         * Provide a link component to render as a breadcrumb. Can be used with Next.js
         * @example
         * import Link from 'next/link'
         * <Breadcrumbs linkComponent={Link} />
         */
        linkComponent?: FC<LinkProps & unknown>;
    };

const conditionallyAddEllipsis = (items: JSX.Element[], showEllipsis: boolean) => {
    if (showEllipsis) {
        const [first, ...rest] = items;
        return [
            first,
            <div className={classes.ellipsis} key="ellypsis">
                &hellip;
            </div>,
            ...rest,
        ];
    } else {
        return items;
    }
};

const Link: FC<LinkProps> = ({href, children, className, title}) => {
    return (
        <a href={href} className={className} title={title}>
            {children}
        </a>
    );
};

export const Breadcrumbs = forwardRef<HTMLDivElement, Props>(
    (
        {
            className,
            items,
            showEllipsis = false,
            linkComponent: LinkComponent = Link,
            ...nativeProps
        },
        ref
    ) => {
        const children = items.map(({name, url, icon: Icon}) => {
            return (
                <LinkComponent key={name} title={name} className={classes.crumb} href={url}>
                    {Icon && <Icon className={classes.icon} />}
                    <span className={classes.text}>{name}</span>
                </LinkComponent>
            );
        });
        return (
            <div {...nativeProps} className={classNames(classes.breadcrumbs, className)} ref={ref}>
                {conditionallyAddEllipsis(children, showEllipsis)}
            </div>
        );
    }
);

Breadcrumbs.displayName = 'Breadcrumbs';
