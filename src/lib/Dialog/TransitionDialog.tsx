import type {FC, ComponentProps} from 'react';
import classNames from 'classnames';

import {Transition} from '@/internal/Transitions';
import classes from '@/internal/Transitions/Transitions.module.css';

import {Animations} from './types.ts';

export type Props = Omit<
    ComponentProps<typeof Transition>,
    'enterClassName' | 'exitClassName' | 'exitDoneClassName' | 'enterDoneClassName'
> & {
    animation?: keyof typeof Animations;
};

export const TransitionDialog: FC<Props> = ({children, animation, ...restProps}) => {
    return (
        <Transition
            {...restProps}
            exitClassName={classNames(
                {
                    [classes.slideTopExit]: animation === Animations['slide-top'],
                    [classes.scaleInExit]: animation === Animations['scale-in'],
                },
                classes.backdropFadeExit
            )}
            enterClassName={classNames(
                {
                    [classes.slideTopEnter]: animation === Animations['slide-top'],
                    [classes.scaleInEnter]: animation === Animations['scale-in'],
                },
                classes.backdropFadeEnter
            )}>
            {children}
        </Transition>
    );
};
