import type {FC} from 'react';

import type {Props} from './Transition';
import {Transition} from './Transition';
import classes from './Transitions.module.css';

export const SlideRight: FC<
    Omit<Props, 'enterClassName' | 'exitClassName' | 'exitDoneClassName' | 'enterDoneClassName'>
> = ({children, unmountNode = true, ...restProps}) => {
    return (
        <Transition
            {...restProps}
            unmountNode={unmountNode}
            exitClassName={classes.slideRightExit}
            enterClassName={classes.slideRightEnter}
            enterDoneClassName={classes.slideRightEnterDone}
            exitDoneClassName={classes.slideRightExitDone}>
            {children}
        </Transition>
    );
};
