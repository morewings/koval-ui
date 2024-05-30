import type {ReactNode} from 'react';
import {forwardRef} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';

import classes from './Text.module.css';

export type Props = DataAttributes &
    LibraryProps & {
        children?: ReactNode;
    };

export const A = forwardRef<HTMLAnchorElement, Props & {href?: string}>(
    ({children, className, href = '#', ...nativeProps}, ref) => {
        return (
            <a
                {...nativeProps}
                href={href}
                className={classNames(classes.link, className)}
                ref={ref}>
                {children}
            </a>
        );
    }
);

A.displayName = 'A';

export const B = forwardRef<HTMLElement, Props>(({children, className, ...nativeProps}, ref) => {
    return (
        <b {...nativeProps} className={classNames(classes.bold, className)} ref={ref}>
            {children}
        </b>
    );
});

B.displayName = 'B';

export const Strong = forwardRef<HTMLElement, Props>(
    ({children, className, ...nativeProps}, ref) => {
        return (
            <strong {...nativeProps} className={classNames(classes.strong, className)} ref={ref}>
                {children}
            </strong>
        );
    }
);

Strong.displayName = 'Strong';

B.displayName = 'B';

export const I = forwardRef<HTMLElement, Props>(({children, className, ...nativeProps}, ref) => {
    return (
        <i {...nativeProps} className={classNames(classes.italic, className)} ref={ref}>
            {children}
        </i>
    );
});

I.displayName = 'I';

export const Em = forwardRef<HTMLElement, Props>(({children, className, ...nativeProps}, ref) => {
    return (
        <em {...nativeProps} className={classNames(classes.emphasized, className)} ref={ref}>
            {children}
        </em>
    );
});

Em.displayName = 'Em';

export const Mark = forwardRef<HTMLElement, Props>(({children, className, ...nativeProps}, ref) => {
    return (
        <mark {...nativeProps} className={classNames(classes.marked, className)} ref={ref}>
            {children}
        </mark>
    );
});

Mark.displayName = 'Mark';

export const Small = forwardRef<HTMLElement, Props>(
    ({children, className, ...nativeProps}, ref) => {
        return (
            <small {...nativeProps} className={classNames(classes.small, className)} ref={ref}>
                {children}
            </small>
        );
    }
);

Small.displayName = 'Small';

export const Del = forwardRef<HTMLModElement, Props>(
    ({children, className, ...nativeProps}, ref) => {
        return (
            <del {...nativeProps} className={classNames(classes.deleted, className)} ref={ref}>
                {children}
            </del>
        );
    }
);

Del.displayName = 'Del';

export const Ins = forwardRef<HTMLModElement, Props>(
    ({children, className, ...nativeProps}, ref) => {
        return (
            <ins {...nativeProps} className={classNames(classes.inserted, className)} ref={ref}>
                {children}
            </ins>
        );
    }
);

Ins.displayName = 'Ins';

export const Sub = forwardRef<HTMLElement, Props>(({children, className, ...nativeProps}, ref) => {
    return (
        <sub {...nativeProps} className={classNames(classes.subscript, className)} ref={ref}>
            {children}
        </sub>
    );
});

Sub.displayName = 'Sub';

export const Sup = forwardRef<HTMLElement, Props>(({children, className, ...nativeProps}, ref) => {
    return (
        <sup {...nativeProps} className={classNames(classes.superscript, className)} ref={ref}>
            {children}
        </sup>
    );
});

Sup.displayName = 'Sup';

export const Kbd = forwardRef<HTMLElement, Props>(({children, className, ...nativeProps}, ref) => {
    return (
        <kbd {...nativeProps} className={classNames(classes.keyboard, className)} ref={ref}>
            {children}
        </kbd>
    );
});

Kbd.displayName = 'Kbd';

export const Code = forwardRef<HTMLElement, Props>(({children, className, ...nativeProps}, ref) => {
    return (
        <code {...nativeProps} className={classNames(classes.code, className)} ref={ref}>
            {children}
        </code>
    );
});

Code.displayName = 'Code';

export const S = forwardRef<HTMLElement, Props>(({children, className, ...nativeProps}, ref) => {
    return (
        <s {...nativeProps} className={classNames(classes.strikeThrough, className)} ref={ref}>
            {children}
        </s>
    );
});

S.displayName = 'S';
