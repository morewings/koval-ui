import {forwardRef, type ReactNode} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';

import classes from './Text.module.css';

export type Props = DataAttributes &
    LibraryProps & {
        children?: ReactNode;
    };

export const Pre = forwardRef<HTMLPreElement, Props>(({children, className, ...nativeProps}, ref) => {
    return (
        <pre {...nativeProps} className={classNames(classes.preformatted, className)} ref={ref}>
            {children}
        </pre>
    );
});

Pre.displayName = 'Pre';
