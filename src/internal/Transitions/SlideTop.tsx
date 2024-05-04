import type {FC} from 'react';

import type {Props} from './Transition';
import {Transition} from './Transition';
import classes from './Transitions.module.css';

export const SlideTop: FC<
    Omit<Props, 'enterClassName' | 'exitClassName' | 'exitDoneClassName' | 'enterDoneClassName'>
> = ({children, ...restProps}) => {
    return (
        <Transition {...restProps} exitClassName={classes.slideTopExit} enterClassName={classes.slideTopEnter}>
            {children}
        </Transition>
    );
};
