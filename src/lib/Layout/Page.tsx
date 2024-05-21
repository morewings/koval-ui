import {forwardRef} from 'react';
import classNames from 'classnames';

import type {Props as GridProps} from './Grid.tsx';
import {Grid} from './Grid.tsx';
import classes from './Layout.module.css';

export type Props = GridProps;

export const Page = forwardRef<HTMLDivElement, Props>(
    (
        {width = 'fluid', className, as = 'div', children, gap = 0, base = 12, ...nativeProps},
        ref
    ) => {
        return (
            <Grid
                {...nativeProps}
                width={width}
                ref={ref}
                className={classNames(classes.page, className)}
                as={as}
                gap={gap}
                base={base}>
                {children}
            </Grid>
        );
    }
);

Page.displayName = 'Page';
