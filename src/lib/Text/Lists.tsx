import type {ReactNode} from 'react';
import {forwardRef} from 'react';
import classNames from 'classnames';

import classes from './Text.module.css';

export type Props = {
    children?: ReactNode;
    className?: string;
};

export const Ul = forwardRef<HTMLUListElement, Props>(({children, className}, ref) => {
    return (
        <ul className={classNames(classes.ul, className)} ref={ref}>
            {children}
        </ul>
    );
});

Ul.displayName = 'Ul';

export const Ol = forwardRef<HTMLOListElement, Props>(({children, className}, ref) => {
    return (
        <ol className={classNames(classes.ol, className)} ref={ref}>
            {children}
        </ol>
    );
});

Ol.displayName = 'Ol';

export const Dl = forwardRef<HTMLDListElement, Props>(({children, className}, ref) => {
    return (
        <dl className={classNames(classes['description-list'], className)} ref={ref}>
            {children}
        </dl>
    );
});

Dl.displayName = 'Dl';
