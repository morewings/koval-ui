import type {FC} from 'react';

import type {Props} from './Transition';
import {Transition} from './Transition';
import classes from './Transitions.module.css';

export const SlideLeft: FC<
    Omit<Props, 'enterClassName' | 'exitClassName' | 'exitDoneClassName' | 'enterDoneClassName'>
> = ({children, unmountNode = true, ...restProps}) => {
    return (
        <Transition
            {...restProps}
            unmountNode={unmountNode}
            exitClassName={classes.slideLeftExit}
            enterClassName={classes.slideLeftEnter}
            enterDoneClassName={classes.slideLeftEnterDone}
            exitDoneClassName={classes.slideLeftExitDone}>
            {children}
        </Transition>
    );
};
