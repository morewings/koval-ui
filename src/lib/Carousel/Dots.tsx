import type {FC} from 'react';
import {useMemo} from 'react';
import classNames from 'classnames';

import classes from './Carousel.module.css';

export const Dots: FC<{amount: number; active: number}> = ({amount, active}) => {
    const dotsArray = useMemo(() => Array.from(Array(amount)), [amount]);
    return (
        <div className={classes.dots}>
            {dotsArray.map((_, i) => {
                const isActive = i === active;
                return (
                    <div
                        className={classNames(classes.dot, {[classes.active]: isActive})}
                        key={i}
                    />
                );
            })}
        </div>
    );
};
