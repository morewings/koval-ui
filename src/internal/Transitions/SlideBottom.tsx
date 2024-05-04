import type {FC} from 'react';

import type {Props} from './Transition';
import {Transition} from './Transition';
import classes from './Transitions.module.css';

export const SlideBottom: FC<
    Omit<Props, 'enterClassName' | 'exitClassName' | 'exitDoneClassName' | 'enterDoneClassName'>
> = ({children, unmountNode = true, ...restProps}) => {
    return (
        <Transition
            {...restProps}
            unmountNode={unmountNode}
            exitClassName={classes.slideBottomExit}
            exitDoneClassName={classes.slideBottomExitDone}
            enterClassName={classes.slideBottomEnter}
            enterDoneClassName={classes.slideBottomEnterDone}>
            {children}
        </Transition>
    );
};
