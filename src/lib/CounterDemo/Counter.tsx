import type {FC} from 'react';

import classes from './Counter.module.css';
import useLogic from './useLogic';

export type Props = {
    /** Set initial value */
    initialValue?: number;
};

export const Counter: FC<Props> = ({initialValue = 0}) => {
    const {count, incrementCount} = useLogic(initialValue);

    return (
        <div className={classes.counter}>
            <h2 className={classes.header}>Counter</h2>
            <button className={classes.button} type="button" onClick={incrementCount}>
                Increment by one
            </button>
            <div>
                Total value: <strong>{count}</strong>
            </div>
        </div>
    );
};
