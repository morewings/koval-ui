import type {ReactNode} from 'react';
import {forwardRef} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';

import classes from './Text.module.css';

export type Props = DataAttributes &
    LibraryProps & {
        children: ReactNode;
    };

export const Table = forwardRef<HTMLTableElement, Props>(
    ({children, className, ...nativeProps}, ref) => {
        return (
            <div className={classes['table-wrapper']}>
                <table {...nativeProps} className={classNames(classes.table, className)} ref={ref}>
                    {children}
                </table>
            </div>
        );
    }
);

Table.displayName = 'Table';
