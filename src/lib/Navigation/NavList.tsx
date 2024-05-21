import type {ReactNode} from 'react';
import {useCallback} from 'react';
import {forwardRef, Fragment} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import {useMatchMedia} from '@/internal/hooks/useMatchMedia.tsx';
import {IconMenu} from '@/internal/Icons';
import {Drawer, useDrawerState} from '@/lib/Drawer';

import classes from './Navigation.module.css';

enum Layouts {
    horizontal = 'horizontal',
    vertical = 'vertical',
}

export type Props = DataAttributes &
    LibraryProps & {
        children?: ReactNode;
        layout?: keyof typeof Layouts;
        collapsible?: boolean;
        collapsibleLabel?: string;
    };

export const NavList = forwardRef<HTMLDivElement, Props>(
    (
        {
            children,
            className,
            layout = Layouts.vertical,
            collapsible = true,
            collapsibleLabel = 'Toggle menu',
            ...nativeProps
        },
        ref
    ) => {
        const isBigScreen = useMatchMedia('(width >= 640px)');
        const collapsed = collapsible && !isBigScreen && layout === Layouts.horizontal;
        const {openDrawer, isOpen, closeDrawer} = useDrawerState('foo');
        const handleClick = useCallback(() => {
            !isOpen && openDrawer();
            isOpen && closeDrawer();
        }, [closeDrawer, isOpen, openDrawer]);
        return collapsed ? (
            <Fragment>
                <button
                    type="button"
                    onClick={handleClick}
                    className={classes.buttonCollapsible}
                    aria-label={collapsibleLabel}>
                    <IconMenu className={classes.iconCollapsible} />
                </button>
                <Drawer id="foo">
                    <div
                        {...nativeProps}
                        className={classNames(classes.navList, classes.vertical, className)}
                        ref={ref}>
                        {children}
                    </div>
                </Drawer>
            </Fragment>
        ) : (
            <div
                {...nativeProps}
                className={classNames(
                    classes.navList,
                    classes.full,
                    {
                        [classes.vertical]: layout === Layouts.vertical,
                        [classes.horizontal]: layout === Layouts.horizontal,
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
