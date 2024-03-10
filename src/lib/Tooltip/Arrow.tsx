import {forwardRef} from 'react';
import type {Placement} from '@floating-ui/react-dom';
import classNames from 'classnames';

import classes from './Tooltip.module.css';

export type Props = {
    placement: Placement;
    x?: number;
    y?: number;
};

export const Arrow = forwardRef<HTMLDivElement, Props>(({placement, x, y}, ref) => {
    const position = placement.split('-')[0];
    return (
        <div
            ref={ref}
            style={{
                position: 'absolute',
                left: x,
                top: y,
            }}
            className={classNames(classes.arrow, {
                [classes.bottom]: position === 'bottom',
                [classes.left]: position === 'left',
                [classes.top]: position === 'top',
                [classes.right]: position === 'right',
            })}>
            <div className={classes.triangle}></div>
        </div>
    );
});

Arrow.displayName = 'Arrow';
