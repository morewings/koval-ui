import type {ReactNode} from 'react';
import {forwardRef} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import {IconLink} from '@/internal/Icons';

import classes from './Text.module.css';

export type Props = DataAttributes &
    LibraryProps & {
        children?: ReactNode;
        /**
         * Display the anchor link with the Header
         */
        anchor?: string;
    };

export const Header = forwardRef<
    HTMLHeadingElement,
    Props & {as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'}
>(({children, className, as, anchor, ...restProps}, ref) => {
    const Component = as;
    return (
        <Component {...restProps} className={classNames(classes.header, className)} ref={ref}>
            {children}
            {anchor && (
                <a className={classes.anchor} href={`#${anchor}`}>
                    <IconLink className={classes.icon} />
                </a>
            )}
        </Component>
    );
});

Header.displayName = 'Header';

export const H1 = forwardRef<HTMLHeadingElement, Props>(
    ({children, className, ...nativeProps}, ref) => {
        return (
            <Header
                {...nativeProps}
                as="h1"
                className={classNames(classes.header1, className)}
                ref={ref}>
                {children}
            </Header>
        );
    }
);

H1.displayName = 'H1';

export const H2 = forwardRef<HTMLHeadingElement, Props>(
    ({children, className, ...nativeProps}, ref) => {
        return (
            <Header
                {...nativeProps}
                as="h2"
                className={classNames(classes.header2, className)}
                ref={ref}>
                {children}
            </Header>
        );
    }
);

H2.displayName = 'H2';

export const H3 = forwardRef<HTMLHeadingElement, Props>(
    ({children, className, ...nativeProps}, ref) => {
        return (
            <Header
                {...nativeProps}
                as="h3"
                className={classNames(classes.header3, className)}
                ref={ref}>
                {children}
            </Header>
        );
    }
);

H3.displayName = 'H3';

export const H4 = forwardRef<HTMLHeadingElement, Props>(
    ({children, className, ...nativeProps}, ref) => {
        return (
            <Header
                {...nativeProps}
                as="h4"
                className={classNames(classes.header4, className)}
                ref={ref}>
                {children}
            </Header>
        );
    }
);

H4.displayName = 'H4';

export const H5 = forwardRef<HTMLHeadingElement, Props>(
    ({children, className, ...nativeProps}, ref) => {
        return (
            <Header
                {...nativeProps}
                as="h5"
                className={classNames(classes.header5, className)}
                ref={ref}>
                {children}
            </Header>
        );
    }
);

H5.displayName = 'H5';

export const H6 = forwardRef<HTMLHeadingElement, Props>(
    ({children, className, ...nativeProps}, ref) => {
        return (
            <Header
                {...nativeProps}
                as="h6"
                className={classNames(classes.header6, className)}
                ref={ref}>
                {children}
            </Header>
        );
    }
);

H6.displayName = 'H6';
