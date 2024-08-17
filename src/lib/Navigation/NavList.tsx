import type {ReactNode} from 'react';
import {useCallback} from 'react';
import {forwardRef, Fragment} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import {useInternalRef} from '@/internal/hooks/useInternalRef.ts';
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
        collapsedLabel?: string;
        collapsed?: boolean;
    };

export const NavList = forwardRef<HTMLDivElement, Props>(
    (
        {
            children,
            className,
            layout = Layouts.vertical,
            collapsedLabel = 'Toggle menu',
            collapsed: collapsedProp,
            ...nativeProps
        },
        ref
    ) => {
        // const isBigScreen = useMatchMedia('(width >= 640px)');
        const internalRef = useInternalRef(ref);
        const collapsed = collapsedProp && layout === Layouts.horizontal;
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
                    aria-label={collapsedLabel}>
                    <IconMenu className={classes.iconCollapsible} />
                </button>
                <Drawer id="foo">
                    <div
                        {...nativeProps}
                        className={classNames(classes.navList, classes.vertical, className)}
                        ref={internalRef}>
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
                ref={internalRef}>
                {children}
            </div>
        );
    }
);

NavList.displayName = 'NavList';
