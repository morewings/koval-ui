import {forwardRef} from 'react';
import type {FC, ReactNode} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';

import classes from './Layout.module.css';

export type Props = DataAttributes &
    LibraryProps & {
        children?: ReactNode;
        /** Attach header to the page top */
        sticky?: boolean;
    };

export const Header: FC<Props> = forwardRef<HTMLDivElement, Props>(
    ({children, sticky = false, className, ...restProps}, ref) => {
        return (
            <header
                {...restProps}
                ref={ref}
                className={classNames(classes.header, {[classes.sticky]: sticky}, className)}>
                {children}
            </header>
        );
    }
);

Header.displayName = 'Header';
