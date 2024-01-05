import {forwardRef} from 'react';
import type {FC, ReactNode} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';

import classes from './Layout.module.css';

export type Props = DataAttributes &
    LibraryProps & {
        children?: ReactNode;
    };

export const Main: FC<Props> = forwardRef<HTMLDivElement, Props>(({children, className, ...restProps}, ref) => {
    return (
        <main ref={ref} {...restProps} className={classNames(classes.main, className)}>
            {children}
        </main>
    );
});

Main.displayName = 'Main';
