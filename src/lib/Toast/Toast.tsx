import type {FC, ReactNode} from 'react';
import {useEffect} from 'react';
import {forwardRef} from 'react';
import classNames from 'classnames';
import {useRootTheme, useLocalTheme} from 'css-vars-hook';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import {Portal} from '@/internal/Portal';
import {IconClose, IconError, IconInfo, IconSuccess, IconWarning} from '@/internal/Icons';
import {useInterval} from '@/internal/hooks/useInterval.ts';
import {useInternalRef} from '@/internal/hooks/useInternalRef.ts';
import {TransitionSlideBottom} from '@/internal/Transitions';
import type {ActionProps} from '@/internal/Actions';
import {Action} from '@/internal/Actions';

import {useToastState} from './useToastState.tsx';
import classes from './Toast.module.css';

enum Variants {
    default = 'default',
    success = 'success',
    error = 'error',
    warning = 'warning',
}

export type Props = DataAttributes &
    LibraryProps & {
        /** Provide unique id to the Toast */
        id: NonNullable<LibraryProps['id']>;
        children?: ReactNode;
        /** Provide an array of actions with callbacks */
        actions?: (ActionProps | [ActionProps, ActionProps])[];
        /**
         * Provide Icon component to show instead default one
         */
        icon?: FC;
        /** Select design variant of Toast to show */
        variant?: keyof typeof Variants;
        /** Provide a main text to display inside Toast */
        title: string;
        /** Provide an additional text to display inside Toast */
        body?: string;
        /** Callback triggered when user click closes Toast */
        onToggle?: (isOpen: boolean) => void;
        /** Set time in seconds to auto close Toast */
        autoClose?: number;
        /** Provide custom label for close Toast action */
        closeLabel?: string;
    };

export const Toast = forwardRef<HTMLDivElement, Props>(
    (
        {
            children,
            className,
            actions = [],
            icon: IconProp,
            variant = Variants.default,
            title,
            body,
            onToggle = () => {},
            id,
            autoClose = null,
            closeLabel = 'Close',
            ...nativeProps
        },
        refProp
    ) => {
        const {isOpen, closeToast} = useToastState(id);
        const {LocalRoot: Provider} = useLocalTheme();
        const {getTheme} = useRootTheme();
        const Icon = IconProp
            ? IconProp
            : {
                  [Variants.default]: IconInfo,
                  [Variants.error]: IconError,
                  [Variants.success]: IconSuccess,
                  [Variants.warning]: IconWarning,
              }[variant];
        useEffect(() => {
            onToggle(isOpen);
        }, [isOpen, onToggle]);
        const needsAutoClose = typeof autoClose === 'number';
        const interval = needsAutoClose ? autoClose * 1000 : null;
        useInterval({callback: closeToast, interval, condition: needsAutoClose});
        const ref = useInternalRef(refProp);
        return (
            <Portal>
                <TransitionSlideBottom show={isOpen} nodeRef={ref}>
                    <Provider className={classes.provider} theme={getTheme()}>
                        <div
                            {...nativeProps}
                            className={classNames(
                                classes.toast,
                                {
                                    [classes.success]: variant === Variants.success,
                                    [classes.warning]: variant === Variants.warning,
                                    [classes.error]: variant === Variants.error,
                                },
                                className
                            )}
                            ref={ref}>
                            <div className={classes.content}>
                                <div className={classes.left}>
                                    <Icon className={classes.icon} />
                                </div>
                                <div className={classes.right}>
                                    <div className={classes.title}>{title}</div>
                                    {body && <div className={classes.body}>{body}</div>}
                                </div>
                            </div>
                            <footer className={classes.actions}>
                                {actions.map((actionSlot, i) => {
                                    if (Array.isArray(actionSlot)) {
                                        const [left, right] = actionSlot;
                                        return (
                                            <div key={`${id}-${i}`} className={classes.row}>
                                                <Action
                                                    {...left}
                                                    className={classes.actionButton}
                                                />
                                                <Action
                                                    {...right}
                                                    className={classes.actionButton}
                                                />
                                            </div>
                                        );
                                    } else {
                                        return (
                                            <div key={`${id}-${i}`} className={classes.row}>
                                                <Action
                                                    {...actionSlot}
                                                    className={classes.actionButton}
                                                />
                                            </div>
                                        );
                                    }
                                })}
                                <div key={`${id}-close`} className={classes.row}>
                                    <Action
                                        className={classes.actionButton}
                                        onClick={closeToast}
                                        icon={IconClose}
                                        title={closeLabel}
                                    />
                                </div>
                            </footer>
                        </div>
                    </Provider>
                </TransitionSlideBottom>
            </Portal>
        );
    }
);

Toast.displayName = 'Toast';
