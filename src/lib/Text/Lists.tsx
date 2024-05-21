import type {ReactNode} from 'react';
import {forwardRef} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';

import classes from './Text.module.css';

export type Props = DataAttributes &
    LibraryProps & {
        children?: ReactNode;
    };

export const Ul = forwardRef<HTMLUListElement, Props>(
    ({children, className, ...nativeProps}, ref) => {
        return (
            <ul {...nativeProps} className={classNames(classes.ul, className)} ref={ref}>
                {children}
            </ul>
        );
    }
);

Ul.displayName = 'Ul';

export const Ol = forwardRef<HTMLOListElement, Props>(
    ({children, className, ...nativeProps}, ref) => {
        return (
            <ol {...nativeProps} className={classNames(classes.ol, className)} ref={ref}>
                {children}
            </ol>
        );
    }
);

Ol.displayName = 'Ol';

export const Dl = forwardRef<HTMLDListElement, Props>(
    ({children, className, ...nativeProps}, ref) => {
        return (
            <dl
                {...nativeProps}
                className={classNames(classes['description-list'], className)}
                ref={ref}>
                {children}
            </dl>
        );
    }
);

Dl.displayName = 'Dl';
