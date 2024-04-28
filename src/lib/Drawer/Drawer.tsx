import type {ReactNode} from 'react';
import {useLocalTheme, useRootTheme} from 'css-vars-hook';
import {forwardRef} from 'react';
import classNames from 'classnames';
import {CSSTransition} from 'react-transition-group';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import {Portal} from '@/internal/Portal';
import {useInternalRef} from '@/internal/hooks/useInternalRef';
import {useDismiss} from '@/internal/hooks/useDismiss';

import classes from './Drawer.module.css';
import {useDrawerState} from './useDrawerState.tsx';

enum Placements {
    left = 'left',
    right = 'right',
}

export type Props = DataAttributes &
    LibraryProps & {
        children?: ReactNode;
        /** Choose side to attach Drawer */
        placement?: keyof typeof Placements;
        /** Provide unique id for Drawer */
        id: string;
    };

const transitionClasses = {
    enterActive: classes.enterActive,
    enterDone: classes.enterDone,
    enter: classes.enter,
    exit: classes.exit,
};

export const Drawer = forwardRef<HTMLDivElement, Props>(
    ({children, className, placement = Placements.left, id, ...nativeProps}, refProp) => {
        const ref = useInternalRef(refProp);
        const {isOpen, closeDrawer} = useDrawerState(id);

        const {getTheme} = useRootTheme();
        const {LocalRoot} = useLocalTheme();

        useDismiss(closeDrawer, ref, isOpen);

        return (
            <Portal>
                <CSSTransition in={isOpen} nodeRef={ref} timeout={300} classNames={transitionClasses} unmountOnExit>
                    <LocalRoot theme={getTheme()} className={classes.provider}>
                        <div
                            {...nativeProps}
                            className={classNames(
                                classes.drawer,
                                {
                                    [classes.left]: placement === Placements.left,
                                    [classes.right]: placement === Placements.right,
                                },
                                className
                            )}
                            ref={ref}>
                            {children}
                        </div>
                    </LocalRoot>
                </CSSTransition>
            </Portal>
        );
    }
);

Drawer.displayName = 'Drawer';
