import type {ReactNode} from 'react';
import {forwardRef} from 'react';
import classNames from 'classnames';

import classes from './Text.module.css';

export type Props = {
    children?: ReactNode;
    className?: string;
};

export const BlockQuote = forwardRef<HTMLQuoteElement, Props>(({children, className}, ref) => {
    return (
        <blockquote className={classNames(classes.blockquote, className)} ref={ref}>
            {children}
        </blockquote>
    );
});

BlockQuote.displayName = 'BlockQuote';
