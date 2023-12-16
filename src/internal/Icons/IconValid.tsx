import type {FC} from 'react';
import Check from '@material-symbols/svg-700/sharp/check.svg?react';
import classNames from 'classnames';

import classes from '@/internal/Icons/Icon.module.css';

import {Icon} from './Icon.tsx';

type Props = {
    className?: string;
};

export const IconValid: FC<Props> = ({className}) => {
    return (
        <Icon className={classNames(classes.valid, className)}>
            <Check />
        </Icon>
    );
};
