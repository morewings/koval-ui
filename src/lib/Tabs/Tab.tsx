import type {FC, HTMLAttributes, ReactNode} from 'react';
import {useRef} from 'react';

import {TransitionFade} from '@/internal/Transitions';

import classes from './Tabs.module.css';

export type Props = {
    name: string;
    children: ReactNode;
    icon?: FC<HTMLAttributes<HTMLOrSVGElement> & unknown>;
};

export const Tab: FC<Props> = ({children}) => {
    const ref = useRef(null);
    return (
        <TransitionFade nodeRef={ref} show={true}>
            <div ref={ref} className={classes.tab}>
                {children}
            </div>
        </TransitionFade>
    );
};
