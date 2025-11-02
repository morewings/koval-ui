import type {ReactNode} from 'react';
import {forwardRef} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';

import classes from './Text.module.css';

enum Hyphens {
    none = 'none',
    manual = 'manual',
    auto = 'auto',
}

export type Props = DataAttributes &
    LibraryProps & {
        children?: ReactNode;
        /**
         * Set hyphenation mode for the text
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/hyphens
         */
        hyphens?: keyof typeof Hyphens;
    };

export const P = forwardRef<HTMLParagraphElement, Props>(
    ({children, className, hyphens = Hyphens.none, ...nativeProps}, ref) => {
        return (
            <p
                {...nativeProps}
                className={classNames(
                    classes.paragraph,
                    {[classes.manual]: hyphens === Hyphens.manual},
                    {[classes.auto]: hyphens === Hyphens.auto},
                    className
                )}
                ref={ref}>
                {children}
            </p>
        );
    }
);

P.displayName = 'P';
