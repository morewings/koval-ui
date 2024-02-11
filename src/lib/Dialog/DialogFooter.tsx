import type {FC, ReactNode} from 'react';
import classNames from 'classnames';

import classes from './Dialog.module.css';

export const DialogFooter: FC<{children?: ReactNode; className?: string}> = ({children, className}) => {
    return <footer className={classNames(classes.footer, className)}>{children}</footer>;
};
