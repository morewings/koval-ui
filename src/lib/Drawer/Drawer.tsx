import type {ReactNode} from 'react';
import {useMemo} from 'react';
import {useLocalTheme, useRootTheme} from 'css-vars-hook';
import {forwardRef} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import {Portal} from '@/internal/Portal';
import {useInternalRef} from '@/internal/hooks/useInternalRef';
import {useDismiss} from '@/internal/hooks/useDismiss';
import {TransitionSlideLeft, TransitionSlideRight} from '@/internal/Transitions';

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

export const Drawer = forwardRef<HTMLDivElement, Props>(
    ({children, className, placement = Placements.left, id, ...nativeProps}, refProp) => {
        const ref = useInternalRef(refProp);
        const {isOpen, closeDrawer} = useDrawerState(id);

        const {getTheme} = useRootTheme();
        const {LocalRoot} = useLocalTheme();

        const Transition = useMemo(
            () =>
                ({
                    [Placements.left]: TransitionSlideLeft,
                    [Placements.right]: TransitionSlideRight,
                })[placement],
            [placement]
        );

        useDismiss(closeDrawer, ref, isOpen);

        return (
            <Portal>
                <Transition show={isOpen} nodeRef={ref}>
                    <LocalRoot theme={getTheme()} className={classes.provider}>
                        <div className={classes.backdrop}>
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
                        </div>
                    </LocalRoot>
                </Transition>
            </Portal>
        );
    }
);

Drawer.displayName = 'Drawer';
