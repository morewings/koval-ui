import type {ReactNode, FC} from 'react';
import {useLocalTheme} from 'css-vars-hook';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';

import classes from './Layout.module.css';

type RowProps = DataAttributes &
    LibraryProps & {
        /** Select an HTML element to render as a container */
        as?: string;
        children: ReactNode;
    };

export const Row: FC<RowProps> = ({className, children, as = 'div'}) => {
    const {LocalRoot} = useLocalTheme();
    return (
        <LocalRoot as={as} className={classNames(classes.row, className)}>
            {children}
        </LocalRoot>
    );
};
