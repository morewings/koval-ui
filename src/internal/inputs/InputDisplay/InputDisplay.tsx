import type {FC, InputHTMLAttributes} from 'react';
import classNames from 'classnames';

import classes from './InputDisplay.module.css';

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'readOnly'>;

export const InputDisplay: FC<Props> = ({className, ...props}) => {
    return <input {...props} readOnly className={classNames(classes['input-display'], className)} />;
};
