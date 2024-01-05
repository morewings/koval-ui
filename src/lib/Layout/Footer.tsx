import {forwardRef} from 'react';
import type {FC, ReactNode} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';

import classes from './Layout.module.css';

export type Props = DataAttributes &
    LibraryProps & {
        children?: ReactNode;
    };

export const Footer: FC<Props> = forwardRef<HTMLDivElement, Props>(({children, className, ...restProps}, ref) => {
    return (
        <footer {...restProps} ref={ref} className={classNames(classes.footer, className)}>
            {children}
        </footer>
    );
});

Footer.displayName = 'Footer';
