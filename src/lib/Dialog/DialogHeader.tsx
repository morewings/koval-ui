import type {FC, ReactNode} from 'react';
import classNames from 'classnames';

import classes from './Dialog.module.css';

export const DialogHeader: FC<{children?: ReactNode; className?: string}> = ({children, className}) => {
    return <header className={classNames(classes.header, className)}>{children}</header>;
};
