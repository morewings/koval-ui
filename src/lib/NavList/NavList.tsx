import type {ReactNode} from 'react';
import {forwardRef} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';

import classes from './NavList.module.css';

enum Variants {
    horizontal = 'horizontal',
    vertical = 'vertical',
}

enum Modes {
    full = 'full',
    compact = 'compact',
}

export type Props = DataAttributes &
    LibraryProps & {
        children?: ReactNode;
        variant?: keyof typeof Variants;
        bordered?: boolean;
        mode?: keyof typeof Modes;
    };

export const NavList = forwardRef<HTMLDivElement, Props>(
    ({children, className, variant = Variants.vertical, bordered = true, mode = Modes.full, ...nativeProps}, ref) => {
        return (
            <div
                {...nativeProps}
                className={classNames(
                    classes.navList,
                    {
                        [classes.vertical]: variant === Variants.vertical,
                        [classes.horizontal]: variant === Variants.horizontal,
                        [classes.bordered]: bordered,
                        [classes.compact]: mode === Modes.compact,
                        [classes.full]: mode === Modes.full,
                    },
                    className
                )}
                ref={ref}>
                {children}
            </div>
        );
    }
);

NavList.displayName = 'NavList';
