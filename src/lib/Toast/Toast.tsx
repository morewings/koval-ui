import type {FC, ReactNode} from 'react';
import {useCallback} from 'react';
import {useEffect} from 'react';
import {forwardRef} from 'react';
import classNames from 'classnames';
import {useRootTheme, useLocalTheme} from 'css-vars-hook';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import {Portal} from '@/internal/Portal';
import {IconError, IconInfo, IconSuccess, IconWarning} from '@/internal/Icons';
import {useInterval} from '@/internal/hooks/useInterval.ts';

import {useToastState} from './useToastState.tsx';
import classes from './Toast.module.css';

enum Variants {
    default = 'default',
    success = 'success',
    error = 'error',
    warning = 'warning',
}

export type ActionProps = {
    name: string;
    title: string;
    icon?: FC;
};

export type Props = DataAttributes &
    LibraryProps & {
        /** Provide unique id to the Toast */
        id: NonNullable<LibraryProps['id']>;
        children?: ReactNode;
        /**
         * Provide array of Actions to display below Toast
         * @see ActionProps
         */
        actions?: ActionProps[];
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
        /** Callback triggered when user click one of provided Actions. Called with the name of Action */
        onClick?: (name: string) => void;
        /** Callback triggered when user click closes Toast */
        onToggle?: (isOpen: boolean) => void;
        /** Set time in seconds to auto close Toast */
        autoClose?: number;
    };

const Action: FC<ActionProps & {onClick: NonNullable<Props['onClick']>}> = ({title, icon: Icon, onClick, name}) => {
    const handleClick = useCallback(() => {
        onClick(name);
    }, [name, onClick]);
    return (
        <button onClick={handleClick} className={classes.action}>
            {Icon && <Icon />}
            {title}
        </button>
    );
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
            onClick = () => {},
            onToggle = () => {},
            id,
            autoClose = null,
            ...nativeProps
        },
        ref
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
        return (
            isOpen && (
                <Portal>
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
                            <div className={classes.actions}>
                                {actions.map(({name, title, icon}) => {
                                    return (
                                        <Action onClick={onClick} icon={icon} name={name} title={title} key={name} />
                                    );
                                })}
                                <button onClick={closeToast} className={classes.action}>
                                    ✕
                                </button>
                            </div>
                        </div>
                    </Provider>
                </Portal>
            )
        );
    }
);

Toast.displayName = 'Toast';
