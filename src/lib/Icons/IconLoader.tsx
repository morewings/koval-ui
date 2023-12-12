import type {FC} from 'react';
import Loader from '@material-symbols/svg-700/sharp/progress_activity.svg?react';
import classNames from 'classnames';

import {Icon} from './Icon.tsx';
import classes from './Icon.module.css';

type Props = {
    className?: string;
};

export const IconLoader: FC<Props> = ({className}) => {
    return (
        <Icon className={classNames(classes.rotation, className)}>
            <Loader />
        </Icon>
    );
};
