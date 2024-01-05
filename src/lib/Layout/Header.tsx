import {forwardRef} from 'react';
import type {FC, ReactNode} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';

import {Row} from './Row.tsx';
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
            <Row
                {...restProps}
                as="header"
                ref={ref}
                className={classNames(classes.header, {[classes.sticky]: sticky}, className)}>
                {children}
            </Row>
        );
    }
);

Header.displayName = 'Header';
