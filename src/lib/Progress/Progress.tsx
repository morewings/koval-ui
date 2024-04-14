import {forwardRef} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import {useInternalId} from '@/internal/hooks/useInternalId.ts';

import classes from './Progress.module.css';

enum Variants {
    plain = 'plain',
    dashed = 'dashed',
}

export type Props = DataAttributes &
    LibraryProps & {
        /**
         * Provide maximum for progress scale
         * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress#max
         */
        max?: number;
        /**
         * Provide value for progress scale
         * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress#value
         */
        value?: number;
        /**
         * Choose appearance of progress bar
         */
        variant?: keyof typeof Variants;
        /**
         * Provide an optional label to display on the left side
         */
        label?: string;
    };

export const Progress = forwardRef<HTMLProgressElement, Props>(
    ({max = 100, value, className, variant = Variants.plain, label, id: idProp, ...nativeProps}, ref) => {
        const id = useInternalId(idProp);
        return (
            <div className={classes.wrapper}>
                {label && (
                    <label className={classes.label} htmlFor={id}>
                        {label}:
                    </label>
                )}
                <progress
                    {...nativeProps}
                    id={id}
                    max={max}
                    value={value}
                    className={classNames(classes.progress, {[classes.dashed]: variant === Variants.dashed}, className)}
                    ref={ref}
                />
            </div>
        );
    }
);

Progress.displayName = 'Progress';
