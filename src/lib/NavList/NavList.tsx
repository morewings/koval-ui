import type {ReactNode} from 'react';
import {forwardRef} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';

import classes from './NavList.module.css';

enum Layouts {
    horizontal = 'horizontal',
    vertical = 'vertical',
}

enum Modes {
    full = 'full',
    compact = 'compact',
}

enum Variants {
    normal = 'normal',
    inverted = 'inverted',
}

export type Props = DataAttributes &
    LibraryProps & {
        children?: ReactNode;
        layout?: keyof typeof Layouts;
        variant?: keyof typeof Variants;
        bordered?: boolean;
        mode?: keyof typeof Modes;
    };

export const NavList = forwardRef<HTMLDivElement, Props>(
    (
        {
            children,
            className,
            layout = Layouts.vertical,
            bordered = true,
            mode = Modes.full,
            variant = Variants.normal,
            ...nativeProps
        },
        ref
    ) => {
        return (
            <div
                {...nativeProps}
                className={classNames(
                    classes.navList,
                    {
                        [classes.vertical]: layout === Layouts.vertical,
                        [classes.horizontal]: layout === Layouts.horizontal,
                        [classes.normal]: variant === Variants.normal,
                        [classes.inverted]: variant === Variants.inverted,
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
