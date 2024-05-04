import type {FC, ComponentProps} from 'react';
import classNames from 'classnames';

import {Transition} from '@/internal/Transitions';
import classes from '@/internal/Transitions/Transitions.module.css';

export const TransitionDialog: FC<
    Omit<
        ComponentProps<typeof Transition>,
        'enterClassName' | 'exitClassName' | 'exitDoneClassName' | 'enterDoneClassName'
    >
> = ({children, ...restProps}) => {
    return (
        <Transition
            {...restProps}
            exitClassName={classNames(classes.slideTopExit, classes.backdropFadeExit)}
            enterClassName={classNames(classes.slideTopEnter, classes.backdropFadeEnter)}>
            {children}
        </Transition>
    );
};
