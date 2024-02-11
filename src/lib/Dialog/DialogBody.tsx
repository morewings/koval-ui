import type {FC, ReactNode} from 'react';
import classNames from 'classnames';

import classes from './Dialog.module.css';

export const DialogBody: FC<{children?: ReactNode; className?: string}> = ({children, className}) => {
    return <div className={classNames(classes.body, className)}>{children}</div>;
};
