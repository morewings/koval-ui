import type {FC, HTMLAttributes, ReactNode} from 'react';
import {useRef} from 'react';

import {TransitionFade} from '@/lib/Transitions';

import classes from './Tabs.module.css';
import {useActiveTab} from './TabContext.tsx';

export type Props = {
    name: string;
    children: ReactNode;
    icon?: FC<HTMLAttributes<HTMLOrSVGElement> & unknown>;
};

export const Tab: FC<Props> = ({children, name}) => {
    const active = useActiveTab();
    const ref = useRef(null);
    return (
        <TransitionFade nodeRef={ref} show={name === active}>
            <div ref={ref} className={classes.tab}>
                {children}
            </div>
        </TransitionFade>
    );
};
