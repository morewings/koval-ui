import {forwardRef} from 'react';
import type {ReactNode} from 'react';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';

import classes from './Layout.module.css';

export type Props = DataAttributes &
    LibraryProps & {
        children?: ReactNode;
    };

export const Page = forwardRef<HTMLDivElement, Props>(({children, ...nativeProps}, ref) => {
    return (
        <div {...nativeProps} className={classes.page} ref={ref}>
            {children}
        </div>
    );
});

Page.displayName = 'Page';
