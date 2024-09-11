import {useRef, useState} from 'react';
import type {KeyboardEvent, FC, ChangeEvent} from 'react';
import {useCallback} from 'react';
import classNames from 'classnames';

import {Pagination as PaginationVanilla} from '@/lib/Pagination';
import {IconEnter} from '@/internal/Icons';
import {useMatchMedia} from '@/internal/hooks/useMatchMedia.tsx';

import classes from './DataTable.module.css';

export type Props = {
    setCurrentPage: (page: number) => void;
    onPageSizeChange: (page: number) => void;
    currentPage: number;
    pagesAmount: number;
    pageSize: number;
    rowsCount: number;
};

export const Pagination: FC<Props> = ({
    setCurrentPage,
    currentPage,
    pagesAmount,
    pageSize: pageSizeProp,
    onPageSizeChange,
    rowsCount,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [pageSize, setPageSize] = useState(pageSizeProp);

    const checkValidity = useCallback(
        (nextValue: number) => {
            return nextValue <= rowsCount;
        },
        [rowsCount]
    );

    const handlePageSizeChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const nextValue = parseInt(event.target.value);
        setPageSize(nextValue);
    }, []);

    const handlePazeSizeEnter = useCallback(
        (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter' && checkValidity(pageSize)) {
                onPageSizeChange(pageSize);
                setCurrentPage(1);
            }
        },
        [checkValidity, onPageSizeChange, pageSize, setCurrentPage]
    );

    const handlePageSizeSubmit = useCallback(() => {
        if (checkValidity(pageSize)) {
            onPageSizeChange(pageSize);
            setCurrentPage(1);
        }
    }, [checkValidity, onPageSizeChange, pageSize, setCurrentPage]);

    const isBigScreen = useMatchMedia('(width >= 768px)');

    const displayPageNavigation = isBigScreen || pagesAmount > 7;

    return (
        <div className={classes.paginationWrapper}>
            <PaginationVanilla
                showPageButtons={true}
                showNavigation={displayPageNavigation}
                onPageSelect={setCurrentPage}
                selectedPage={currentPage}
                totalPages={pagesAmount}
            />
            <div className={classes.paginationFieldset}>
                <label htmlFor="input" className={classes.paginationLabel}>
                    Rows per page:
                </label>
                <input
                    min={1}
                    max={rowsCount}
                    ref={inputRef}
                    onKeyUp={handlePazeSizeEnter}
                    onChange={handlePageSizeChange}
                    value={pageSize}
                    id="input"
                    type="number"
                    className={classNames(classes.paginationInput, {
                        [classes.error]: !checkValidity(pageSize),
                    })}
                />
                <button
                    disabled={!checkValidity(pageSize)}
                    className={classes.paginationButton}
                    onClick={handlePageSizeSubmit}>
                    <IconEnter className={classes.icon} />
                </button>
            </div>
        </div>
    );
};
