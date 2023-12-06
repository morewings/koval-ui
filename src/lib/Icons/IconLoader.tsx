import type {FC} from 'react';
import Loader from '@material-symbols/svg-700/sharp/progress_activity.svg?react';

import {Icon} from './Icon.tsx';
import classes from './Icon.module.css';

export const IconLoader: FC = () => {
    return (
        <Icon className={classes.rotation}>
            <Loader />
        </Icon>
    );
};
