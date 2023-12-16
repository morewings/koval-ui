import type {FC, ReactNode} from 'react';
import classNames from 'classnames';

import classes from './Text.module.css';

export type Props = {
    children?: ReactNode;
    className?: string;
};

export const Text: FC<Props> = ({children, className}) => {
    return <div className={classNames(classes.text, className)}>{children}</div>;
};
