import type {ReactNode} from 'react';
import {forwardRef} from 'react';
import classNames from 'classnames';

import classes from './Text.module.css';

export type Props = {
    children?: ReactNode;
    className?: string;
};

export const H1 = forwardRef<HTMLHeadingElement, Props>(({children, className}, ref) => {
    return (
        <h1 className={classNames(classes.header1, className)} ref={ref}>
            {children}
        </h1>
    );
});

H1.displayName = 'H1';

export const H2 = forwardRef<HTMLHeadingElement, Props>(({children, className}, ref) => {
    return (
        <h2 className={classNames(classes.header2, className)} ref={ref}>
            {children}
        </h2>
    );
});

H2.displayName = 'H2';

export const H3 = forwardRef<HTMLHeadingElement, Props>(({children, className}, ref) => {
    return (
        <h3 className={classNames(classes.header3, className)} ref={ref}>
            {children}
        </h3>
    );
});

H3.displayName = 'H3';

export const H4 = forwardRef<HTMLHeadingElement, Props>(({children, className}, ref) => {
    return (
        <h4 className={classNames(classes.header4, className)} ref={ref}>
            {children}
        </h4>
    );
});

H4.displayName = 'H4';

export const H5 = forwardRef<HTMLHeadingElement, Props>(({children, className}, ref) => {
    return (
        <h5 className={classNames(classes.header5, className)} ref={ref}>
            {children}
        </h5>
    );
});

H5.displayName = 'H5';

export const H6 = forwardRef<HTMLHeadingElement, Props>(({children, className}, ref) => {
    return (
        <h6 className={classNames(classes.header6, className)} ref={ref}>
            {children}
        </h6>
    );
});

H6.displayName = 'H6';
