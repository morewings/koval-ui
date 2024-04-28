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

export type Props = DataAttributes &
    LibraryProps & {
        children?: ReactNode;
        /** Provide a list of items to render inside breadcrumbs */
        items: Item[];
        /** Enable to show '...' after first breadcrumb item */
        showEllipsis?: boolean;
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

export const Breadcrumbs = forwardRef<HTMLDivElement, Props>(
    ({className, items, showEllipsis = false, ...nativeProps}, ref) => {
        const children = items.map(({name, url, icon: Icon}) => {
            return (
                <a key={name} title={name} className={classes.crumb} href={url}>
                    {Icon && <Icon className={classes.icon} />}
                    <span className={classes.text}>{name}</span>
                </a>
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
