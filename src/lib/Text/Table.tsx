import type {MutableRefObject, ReactNode} from 'react';
import {forwardRef} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';

import classes from './Text.module.css';

export type Props = DataAttributes &
    LibraryProps & {
        children: ReactNode;
        wrapperRef?: MutableRefObject<HTMLDivElement | null>;
        wrapperClassName?: string;
    };

export const Table = forwardRef<HTMLTableElement, Props>(
    ({children, className, wrapperRef, wrapperClassName, ...nativeProps}, ref) => {
        return (
            <div ref={wrapperRef} className={classNames(classes.tableWrapper, wrapperClassName)}>
                <table {...nativeProps} className={classNames(classes.table, className)} ref={ref}>
                    {children}
                </table>
            </div>
        );
    }
);

Table.displayName = 'Table';
