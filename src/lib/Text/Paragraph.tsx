import type {ReactNode} from 'react';
import {forwardRef} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';

import classes from './Text.module.css';

export type Props = DataAttributes &
    LibraryProps & {
        children?: ReactNode;
    };

export const P = forwardRef<HTMLParagraphElement, Props>(
    ({children, className, ...nativeProps}, ref) => {
        return (
            <p {...nativeProps} className={classNames(classes.paragraph, className)} ref={ref}>
                {children}
            </p>
        );
    }
);

P.displayName = 'P';
