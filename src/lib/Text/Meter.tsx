import {forwardRef} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';

import classes from './Text.module.css';

export type Props = DataAttributes &
    LibraryProps & {
        max: number;
        min: number;
        value: number;
        low?: number;
        high?: number;
        optimum?: number;
    };

export const Meter = forwardRef<HTMLMeterElement, Props>(
    ({max, min, value, low, high, optimum, className, ...nativeProps}, ref) => {
        return (
            <meter
                {...nativeProps}
                min={min}
                max={max}
                low={low}
                high={high}
                optimum={optimum}
                value={value}
                className={classNames(classes.meter, className)}
                ref={ref}>
                {value}
            </meter>
        );
    }
);

Meter.displayName = 'Meter';
