import type {FC, HTMLAttributes} from 'react';
import {useCallback} from 'react';
import classNames from 'classnames';

import classes from './Tabs.module.css';
import {useActiveTab} from './TabContext.tsx';

type Props = {
    tabName: string;
    onClick: (tabName: string) => void;
    icon?: FC<HTMLAttributes<HTMLOrSVGElement> & unknown>;
};

export const TabButton: FC<Props> = ({tabName, onClick, icon: Icon}) => {
    const active = useActiveTab();
    const handleClick = useCallback(() => {
        onClick(tabName);
    }, [onClick, tabName]);
    return (
        <button
            type="button"
            key={tabName}
            onClick={handleClick}
            className={classNames(classes.button, {[classes.selected]: active === tabName})}>
            {Icon && <Icon className={classes.icon} />}
            {tabName}
        </button>
    );
};
