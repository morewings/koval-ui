import type {ReactNode} from 'react';
import {forwardRef} from 'react';
import classNames from 'classnames';

import classes from './Text.module.css';

export type Props = {
    children?: ReactNode;
    className?: string;
};

export const A = forwardRef<HTMLAnchorElement, Props & {href?: string}>(({children, className, href = '#'}, ref) => {
    return (
        <a href={href} className={classNames(classes.link, className)} ref={ref}>
            {children}
        </a>
    );
});

A.displayName = 'A';

export const B = forwardRef<HTMLElement, Props>(({children, className}, ref) => {
    return (
        <b className={classNames(classes.bold, className)} ref={ref}>
            {children}
        </b>
    );
});

B.displayName = 'B';

export const Strong = forwardRef<HTMLElement, Props>(({children, className}, ref) => {
    return (
        <strong className={classNames(classes.strong, className)} ref={ref}>
            {children}
        </strong>
    );
});

Strong.displayName = 'Strong';

B.displayName = 'B';

export const I = forwardRef<HTMLElement, Props>(({children, className}, ref) => {
    return (
        <i className={classNames(classes.italic, className)} ref={ref}>
            {children}
        </i>
    );
});

I.displayName = 'I';

export const Em = forwardRef<HTMLElement, Props>(({children, className}, ref) => {
    return (
        <em className={classNames(classes.emphasized, className)} ref={ref}>
            {children}
        </em>
    );
});

Em.displayName = 'Em';

export const Mark = forwardRef<HTMLElement, Props>(({children, className}, ref) => {
    return (
        <mark className={classNames(classes.marked, className)} ref={ref}>
            {children}
        </mark>
    );
});

Mark.displayName = 'Mark';

export const Small = forwardRef<HTMLElement, Props>(({children, className}, ref) => {
    return (
        <small className={classNames(classes.small, className)} ref={ref}>
            {children}
        </small>
    );
});

Small.displayName = 'Small';

export const Del = forwardRef<HTMLModElement, Props>(({children, className}, ref) => {
    return (
        <del className={classNames(classes.deleted, className)} ref={ref}>
            {children}
        </del>
    );
});

Del.displayName = 'Del';

export const Ins = forwardRef<HTMLModElement, Props>(({children, className}, ref) => {
    return (
        <ins className={classNames(classes.inserted, className)} ref={ref}>
            {children}
        </ins>
    );
});

Ins.displayName = 'Ins';

export const Sub = forwardRef<HTMLElement, Props>(({children, className}, ref) => {
    return (
        <sub className={classNames(classes.subscript, className)} ref={ref}>
            {children}
        </sub>
    );
});

Sub.displayName = 'Sub';

export const Sup = forwardRef<HTMLElement, Props>(({children, className}, ref) => {
    return (
        <sup className={classNames(classes.superscript, className)} ref={ref}>
            {children}
        </sup>
    );
});

Sup.displayName = 'Sup';

export const Kbd = forwardRef<HTMLElement, Props>(({children, className}, ref) => {
    return (
        <kbd className={classNames(classes.keyboard, className)} ref={ref}>
            {children}
        </kbd>
    );
});

Kbd.displayName = 'Kbd';
