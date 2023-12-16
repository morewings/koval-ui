import type {ReactNode} from 'react';
import {forwardRef} from 'react';
import classNames from 'classnames';

import classes from './Text.module.css';

export type Props = {
    children?: ReactNode;
    className?: string;
};

export const P = forwardRef<HTMLParagraphElement, Props>(({children, className}, ref) => {
    return (
        <p className={classNames(classes.paragraph, className)} ref={ref}>
            {children}
        </p>
    );
});

P.displayName = 'P';
