import type {FC} from 'react';

import type {Props} from './Transition';
import {Transition} from './Transition';
import classes from './Transitions.module.css';

export const Fade: FC<
    Omit<Props, 'enterClassName' | 'exitClassName' | 'exitDoneClassName' | 'enterDoneClassName'>
> = ({children, unmountNode = true, ...restProps}) => {
    return (
        <Transition
            {...restProps}
            exitClassName={classes.fadeExit}
            enterClassName={classes.fadeEnter}
            unmountNode={unmountNode}>
            {children}
        </Transition>
    );
};
