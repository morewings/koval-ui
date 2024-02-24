import type {FC, HTMLAttributes} from 'react';
import {useCallback} from 'react';
import classNames from 'classnames';

import classes from './Tabs.module.css';

type Props = {
    tabName: string;
    selected: boolean;
    onClick: (tabName: string) => void;
    icon?: FC<HTMLAttributes<HTMLOrSVGElement> & unknown>;
};

export const TabButton: FC<Props> = ({tabName, selected, onClick, icon: Icon}) => {
    const handleClick = useCallback(() => {
        onClick(tabName);
    }, [onClick, tabName]);
    return (
        <button
            type="button"
            key={tabName}
            onClick={handleClick}
            className={classNames(classes.button, {[classes.selected]: selected})}>
            {Icon && <Icon className={classes.icon} />}
            {tabName}
        </button>
    );
};
