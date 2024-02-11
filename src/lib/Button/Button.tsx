import type {FC, DetailedHTMLProps, ButtonHTMLAttributes, MouseEvent, HTMLAttributes, ReactNode} from 'react';
import classNames from 'classnames';

import classes from './Button.module.css';
import type {Variants, Sizes} from './Types.ts';

export type Props = {
    children?: ReactNode;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    type?: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>['type'];
    disabled?: boolean;
    variant?: keyof typeof Variants;
    size?: keyof typeof Sizes;
    className?: string;
    prefix?: FC<HTMLAttributes<HTMLOrSVGElement> & unknown>;
    suffix?: FC<HTMLAttributes<HTMLOrSVGElement> & unknown>;
};

export const Button: FC<Props> = ({
    children,
    onClick,
    type = 'button',
    disabled,
    variant = 'primary',
    className,
    prefix: Prefix,
    suffix: Suffix,
    size = 'medium',
}) => {
    return (
        <button
            onClick={onClick}
            type={type}
            className={classNames(classes.button, classes[variant], classes[size], className)}
            disabled={disabled}>
            {Prefix && <Prefix className={classes.icon} />}
            <div className={classes.content}>{children}</div>
            {Suffix && <Suffix className={classes.icon} />}
        </button>
    );
};
