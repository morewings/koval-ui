import type {ReactNode} from 'react';
import {forwardRef} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';

import classes from './Navigation.module.css';

export type Props = DataAttributes &
    LibraryProps & {
        name?: string;
        children?: ReactNode;
    };

export const NavPanel = forwardRef<HTMLDivElement, Props>(
    ({children, className, name = 'Forge App', ...nativeProps}, ref) => {
        return (
            <div {...nativeProps} className={classNames(classes.navPanel, className)} ref={ref}>
                {name && <h1 className={classes.name}>{name}</h1>}
                {children}
            </div>
        );
    }
);

NavPanel.displayName = 'NavPanel';
