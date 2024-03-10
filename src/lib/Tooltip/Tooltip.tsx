import type {ReactNode} from 'react';
import {useCallback} from 'react';
import {useState, useEffect, useRef} from 'react';
import {forwardRef, Fragment} from 'react';
import classNames from 'classnames';
import type {Placement} from '@floating-ui/react-dom';
import {useFloating, autoUpdate, offset, arrow, flip} from '@floating-ui/react-dom';
import {useRootTheme, useLocalTheme} from 'css-vars-hook';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import {Portal} from '@/internal/Portal';
import {useDismiss} from '@/internal/hooks/useDismiss.ts';
import {useFocusTrap} from '@/internal/hooks/useFocusTrap.ts';

import {Arrow} from './Arrow.tsx';
import classes from './Tooltip.module.css';

export type Props = DataAttributes &
    LibraryProps & {
        children: ReactNode;
        isOpen?: boolean;
        content: ReactNode;
        referenceClassName?: string;
        onToggle?: (openState: boolean) => void;
        trapFocus?: boolean;
        placement?: Placement;
    };

export const Tooltip = forwardRef<HTMLDivElement, Props>(
    (
        {
            children,
            className,
            isOpen: openProp = false,
            content,
            referenceClassName,
            onToggle = () => {},
            trapFocus = true,
            placement: placementProp = 'bottom',
            ...nativeProps
        },
        ref
    ) => {
        const [isOpen, setOpen] = useState(openProp);
        useEffect(() => {
            setOpen(openProp);
        }, [openProp, setOpen]);
        useEffect(() => {
            onToggle(isOpen);
        }, [isOpen, onToggle]);

        const arrowRef = useRef(null);

        const {refs, floatingStyles, middlewareData, placement} = useFloating<HTMLDivElement>({
            strategy: 'fixed',
            placement: placementProp,
            whileElementsMounted: autoUpdate,
            middleware: [
                offset(18),
                flip(),
                arrow({
                    element: arrowRef,
                }),
            ],
        });
        const {LocalRoot} = useLocalTheme();
        const {getTheme} = useRootTheme();

        const handleDismiss = useCallback(() => {
            setOpen(false);
        }, [setOpen]);

        useDismiss(handleDismiss, refs.reference.current, isOpen);
        useFocusTrap(refs.floating.current, isOpen, trapFocus);

        return (
            <Fragment>
                <div ref={refs.setReference} className={classNames(classes.reference, referenceClassName)}>
                    {children}
                </div>
                {isOpen && (
                    <Portal>
                        <div ref={refs.setFloating} style={floatingStyles}>
                            <LocalRoot className={classes.provider} theme={getTheme()}>
                                <div {...nativeProps} ref={ref} className={classNames(classes.tooltip, className)}>
                                    <Arrow
                                        ref={arrowRef}
                                        placement={placement}
                                        x={middlewareData.arrow?.x}
                                        y={middlewareData.arrow?.y}
                                    />
                                    {content}
                                </div>
                            </LocalRoot>
                        </div>
                    </Portal>
                )}
            </Fragment>
        );
    }
);

Tooltip.displayName = 'Tooltip';
