import type {FC, HTMLAttributes, ReactNode} from 'react';
import {useRef} from 'react';
import {CSSTransition} from 'react-transition-group';

import classes from './Tabs.module.css';
import {useActiveTab} from './TabContext.tsx';

export type Props = {
    name: string;
    children: ReactNode;
    icon?: FC<HTMLAttributes<HTMLOrSVGElement> & unknown>;
};

const transitionClasses = {
    enterActive: classes.enterActive,
    enter: classes.enter,
    exit: classes.exit,
};

export const Tab: FC<Props> = ({children, name}) => {
    const active = useActiveTab();
    const ref = useRef(null);
    return (
        <CSSTransition in={name === active} nodeRef={ref} timeout={333} classNames={transitionClasses} unmountOnExit>
            <div ref={ref} className={classes.tab}>
                {children}
            </div>
        </CSSTransition>
    );
};
