import type {FC, ReactNode} from 'react';
import {forwardRef} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';

import classes from './Navigation.module.css';

export type Props = DataAttributes & LibraryProps & {children: ReactNode; className?: string};

export const NavBrand: FC<Props> = forwardRef<HTMLHeadingElement, Props>(
    ({children, className, ...nativeProps}, ref) => {
        return (
            <h1 {...nativeProps} className={classNames(classes.name, className)} ref={ref}>
                {children}
            </h1>
        );
    }
);

NavBrand.displayName = 'NavBrand';
