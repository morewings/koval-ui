import type {FC, DetailedHTMLProps, ButtonHTMLAttributes, MouseEvent, HTMLAttributes, ReactNode} from 'react';
import {forwardRef} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';

import classes from './Button.module.css';
import type {Variants, Sizes} from './Types.ts';

export type Props = DataAttributes &
    LibraryProps & {
        children?: ReactNode;
        onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
        type?: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>['type'];
        disabled?: boolean;
        variant?: keyof typeof Variants;
        size?: keyof typeof Sizes;
        prefix?: FC<HTMLAttributes<HTMLOrSVGElement> & unknown>;
        suffix?: FC<HTMLAttributes<HTMLOrSVGElement> & unknown>;
    };

export const Button: FC<Props> = forwardRef<HTMLButtonElement, Props>(
    (
        {
            children,
            onClick,
            type = 'button',
            disabled,
            variant = 'primary',
            className,
            prefix: Prefix,
            suffix: Suffix,
            size = 'medium',
            ...nativeProps
        },
        ref
    ) => {
        return (
            <button
                {...nativeProps}
                ref={ref}
                onClick={onClick}
                type={type}
                className={classNames(classes.button, classes[variant], classes[size], className)}
                disabled={disabled}>
                {Prefix && <Prefix className={classes.icon} />}
                <div className={classes.content}>{children}</div>
                {Suffix && <Suffix className={classes.icon} />}
            </button>
        );
    }
);

Button.displayName = 'Button';
