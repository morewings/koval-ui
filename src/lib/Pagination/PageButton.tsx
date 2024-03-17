import type {FC} from 'react';
import {useCallback} from 'react';
import classNames from 'classnames';

import classes from './Pagination.module.css';

type Props = {pageNumber: number; onClick?: (pageNumber: number) => void; isActive: boolean};

export const PageButton: FC<Props> = ({pageNumber, onClick = () => {}, isActive}) => {
    const handleClick = useCallback(() => {
        onClick(pageNumber);
    }, [onClick, pageNumber]);
    return (
        <button
            disabled={isActive}
            className={classNames(classes.pageButton, {[classes.active]: isActive})}
            onClick={handleClick}>
            {pageNumber}
        </button>
    );
};
