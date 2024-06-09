import type {ReactNode} from 'react';
import {useCallback} from 'react';
import {useState, useEffect} from 'react';
import {forwardRef, Fragment} from 'react';
import classNames from 'classnames';
import {useFloating, autoUpdate, size, offset, autoPlacement} from '@floating-ui/react-dom';
import {useRootTheme, useLocalTheme} from 'css-vars-hook';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import {Portal} from '@/internal/Portal';
import {useDismiss} from '@/internal/hooks/useDismiss.ts';
import {useFocusTrap} from '@/internal/hooks/useFocusTrap.ts';

import classes from './Menu.module.css';

enum Variants {
    bordered = 'bordered',
    plain = 'plain',
}

export type Props = DataAttributes &
    LibraryProps & {
        children: ReactNode;
        /** Control visibility of Menu */
        isOpen?: boolean;
        /**
         * Provide Tooltip content
         * @example
         * <Menu content={<div>Foo<div>} //... />
         */
        content: ReactNode;
        /** Set class name of reference component wrapper */
        referenceClassName?: string;
        /** Provide callback for open/close events */
        onToggle?: (openState: boolean) => void;
        /** Focus on first element when open and trap focus */
        trapFocus?: boolean;
        /** Align Menu width with reference element */
        alignWidth?: boolean;
        /** Set design of Menu */
        variant?: keyof typeof Variants;
    };

export const Menu = forwardRef<HTMLDivElement, Props>(
    (
        {
            children,
            className,
            isOpen: openProp = false,
            content,
            referenceClassName,
            onToggle = () => {},
            trapFocus = true,
            alignWidth = true,
            variant = Variants.plain,
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
        const {refs, floatingStyles} = useFloating<HTMLDivElement>({
            strategy: 'fixed',
            whileElementsMounted: autoUpdate,
            middleware: [
                alignWidth &&
                    size({
                        apply({rects, elements}) {
                            Object.assign(elements.floating.style, {
                                width: `${rects.reference.width}px`,
                            });
                        },
                    }),
                offset(18),
                autoPlacement(),
            ],
        });
        const {LocalRoot} = useLocalTheme();
        const {getTheme} = useRootTheme();

        const handleDismiss = useCallback(() => {
            setOpen(false);
        }, [setOpen]);

        useDismiss(handleDismiss, refs.reference, isOpen);
        useFocusTrap(refs.floating.current, isOpen, trapFocus);

        return (
            <Fragment>
                <div
                    ref={refs.setReference}
                    className={classNames(classes.reference, referenceClassName)}>
                    {children}
                </div>
                {isOpen && (
                    <Portal>
                        <div ref={refs.setFloating} style={floatingStyles}>
                            <LocalRoot className={classes.provider} theme={getTheme()}>
                                <div
                                    {...nativeProps}
                                    ref={ref}
                                    className={classNames(
                                        classes.menu,
                                        {
                                            [classes.bordered]: variant === Variants.bordered,
                                            [classes.plain]: variant === Variants.plain,
                                        },
                                        className
                                    )}>
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

Menu.displayName = 'Menu';
