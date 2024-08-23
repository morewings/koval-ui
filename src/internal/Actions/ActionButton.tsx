import type {FC, HTMLAttributes, MouseEvent} from 'react';
import {useMemo} from 'react';
import {useCallback} from 'react';
import classNames from 'classnames';

import {IconSuccess, IconDanger, IconLink} from '@/internal/Icons';

import {ActionTypes} from './ActionTypes.ts';
import classes from './ActionButton.module.css';

export type Props = {
    title?: string;
    icon?: FC<HTMLAttributes<HTMLOrSVGElement> & unknown>;
    type?: keyof typeof ActionTypes;
    onClick?: (name: MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    disabled?: boolean;
};

export const ActionButton: FC<Props> = ({
    title,
    icon,
    type = 'default',
    onClick = () => {},
    className,
    disabled,
}) => {
    const ActionIcon = useMemo(
        () =>
            icon ??
            {
                [ActionTypes.success]: IconSuccess,
                [ActionTypes.danger]: IconDanger,
                [ActionTypes.link]: IconLink,
                [ActionTypes.default]: undefined,
            }[type],
        [icon, type]
    );

    const handleClick = useCallback(
        (event: MouseEvent<HTMLButtonElement>) => {
            onClick(event);
        },
        [onClick]
    );

    return (
        <button
            disabled={disabled}
            title={title}
            onClick={handleClick}
            className={classNames(
                classes.actionButton,
                {
                    [classes.default]: type === ActionTypes.default,
                    [classes.link]: type === ActionTypes.link,
                    [classes.success]: type === ActionTypes.success,
                    [classes.danger]: type === ActionTypes.danger,
                },
                className
            )}>
            {ActionIcon && <ActionIcon className={classes.actionIcon} />}
            {title && <span className={classes.actionLabel}>{title}</span>}
        </button>
    );
};
