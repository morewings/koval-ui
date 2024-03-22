import type {FC, ReactNode} from 'react';
import {useCallback} from 'react';
import {useEffect} from 'react';
import {forwardRef} from 'react';
import classNames from 'classnames';
import {useRootTheme, useLocalTheme} from 'css-vars-hook';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import {Portal} from '@/internal/Portal';
import {IconError, IconInfo, IconSuccess, IconWarning} from '@/internal/Icons';

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
        id: NonNullable<LibraryProps['id']>;
        children?: ReactNode;
        actions?: ActionProps[];
        icon?: FC;
        variant?: keyof typeof Variants;
        title: string;
        body?: string;
        onClick?: (name: string) => void;
        onToggle?: (isOpen: boolean) => void;
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
