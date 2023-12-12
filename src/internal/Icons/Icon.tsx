import type {FC, ReactElement} from 'react';
import classNames from 'classnames';

import classes from './Icon.module.css';

type Props = {
    className?: string;
    children?: ReactElement;
};

export const Icon: FC<Props> = ({children, className}) => {
    return <div className={classNames(classes.icon, className)}>{children}</div>;
};
