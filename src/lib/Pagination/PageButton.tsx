import type {FC} from 'react';
import {useCallback} from 'react';
import classNames from 'classnames';

import classes from './Pagination.module.css';

type Props = {
    pageNumber: number;
    onClick?: (pageNumber: number) => void;
    isActive: boolean;
    className?: string;
};

export const PageButton: FC<Props> = ({pageNumber, onClick = () => {}, isActive, className}) => {
    const handleClick = useCallback(() => {
        onClick(pageNumber);
    }, [onClick, pageNumber]);
    return (
        <button
            disabled={isActive}
            className={classNames(classes.pageButton, {[classes.active]: isActive}, className)}
            onClick={handleClick}>
            {pageNumber}
        </button>
    );
};
