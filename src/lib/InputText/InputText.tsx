import type {FC} from 'react';
import classNames from 'classnames';

import {IconEmail, IconError, IconValid, IconLoader} from '@/lib/Icons';

import classes from './InputText.module.css';

enum Validation {
    error = 'error',
    valid = 'valid',
    inProgress = 'inProgress',
}

export type Props = {
    prefix?: FC;
    className?: string;
    validation?: keyof typeof Validation;
};

export const InputText: FC<Props> = ({prefix: Prefix = IconEmail, className, validation = 'inProgress'}) => {
    const ValidationIcon = {
        [Validation.error]: IconError,
        [Validation.valid]: IconValid,
        [Validation.inProgress]: IconLoader,
    }[validation!];
    return (
        <div className={classNames(classes.wrapper, className)}>
            {Prefix && <Prefix />}
            <input className={classes.input} type="text" />
            {validation && <ValidationIcon />}
        </div>
    );
};
