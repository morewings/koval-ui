import type {ReactNode} from 'react';
import {forwardRef} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';

import classes from './Text.module.css';

export type Props = DataAttributes &
    LibraryProps & {
        children?: ReactNode;
    };

export const BlockQuote = forwardRef<HTMLQuoteElement, Props>(
    ({children, className, ...nativeProps}, ref) => {
        return (
            <blockquote
                {...nativeProps}
                className={classNames(classes.blockquote, className)}
                ref={ref}>
                {children}
            </blockquote>
        );
    }
);

BlockQuote.displayName = 'BlockQuote';
