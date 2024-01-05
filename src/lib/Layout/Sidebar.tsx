import {forwardRef} from 'react';
import type {ReactNode} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';

import classes from './Layout.module.css';

export type Props = DataAttributes &
    LibraryProps & {
        children?: ReactNode;
    };

export const Sidebar = forwardRef<HTMLDivElement, Props>(({children, className, ...restProps}, ref) => {
    return (
        <aside {...restProps} ref={ref} className={classNames(classes.aside, className)}>
            {children}
        </aside>
    );
});

Sidebar.displayName = 'Sidebar';
