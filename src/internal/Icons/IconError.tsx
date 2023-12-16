import type {FC} from 'react';
import Error from '@material-symbols/svg-700/sharp/error.svg?react';
import classNames from 'classnames';

import classes from './Icon.module.css';
import {Icon} from './Icon.tsx';

type Props = {
    className?: string;
};

export const IconError: FC<Props> = ({className}) => {
    return (
        <Icon className={classNames(classes.error, className)}>
            <Error />
        </Icon>
    );
};
