import type {ReactElement, ReactNode} from 'react';
import {Children, cloneElement, useMemo} from 'react';
import {forwardRef} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import {useIsOverflow} from '@/internal/hooks/useIsOverflow.ts';
import {useInternalRef} from '@/internal/hooks/useInternalRef.ts';

import classes from './Navigation.module.css';
import {NavBrand} from './NavBrand.tsx';

export type Props = DataAttributes &
    LibraryProps & {
        /**
         * Provide a site/app name to render inside the panel on the left
         */
        name?: string;
        children?: ReactNode;
        /**
         * Enable to make the panel sticky
         */
        sticky?: boolean;
    };

export const NavPanel = forwardRef<HTMLDivElement, Props>(
    ({children, className, name = 'Koval App', sticky, ...nativeProps}, ref) => {
        const internalRef = useInternalRef(ref);
        const {overflowX} = useIsOverflow(internalRef);
        const childrenWithProps = useMemo(
            () =>
                Children.toArray(children).map(element =>
                    cloneElement(element as ReactElement, {collapsed: overflowX})
                ),
            [children, overflowX]
        );
        return (
            <div
                {...nativeProps}
                className={classNames(classes.navPanel, {[classes.sticky]: sticky}, className)}
                ref={internalRef}>
                {name && <NavBrand>{name}</NavBrand>}
                {childrenWithProps}
            </div>
        );
    }
);

NavPanel.displayName = 'NavPanel';
