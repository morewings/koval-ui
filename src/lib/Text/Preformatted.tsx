import {forwardRef, type HTMLAttributes, type ReactNode} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';

import classes from './Text.module.css';

export type Props = DataAttributes &
    LibraryProps & {
        children?: ReactNode;
        contentEditable?: HTMLAttributes<HTMLPreElement>['contentEditable'];
    };

export const Pre = forwardRef<HTMLPreElement, Props>(({children, className, ...nativeProps}, ref) => {
    return (
        <pre {...nativeProps} className={classNames(classes.preformatted, className)} ref={ref}>
            {children}
        </pre>
    );
});

Pre.displayName = 'Pre';
