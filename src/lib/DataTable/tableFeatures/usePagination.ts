import {useCallback, useEffect, useState} from 'react';
import type {PaginationState} from '@tanstack/react-table';

import type {TableData} from './../types.ts';

export type Props = {
    paginationProp: PaginationState;
    tableData: TableData;
    onPaginationChange: (paginationState: PaginationState) => void;
};

export const usePagination = ({paginationProp, onPaginationChange}: Props) => {
    const [pagination, setPagination] = useState<PaginationState>(paginationProp);

    useEffect(() => {
        setPagination(paginationProp);
    }, [paginationProp]);

    useEffect(() => {
        onPaginationChange(pagination);
    }, [onPaginationChange, pagination]);

    const currentPage = pagination.pageIndex + 1;

    const setCurrentPage = useCallback((nextPage: number) => {
        setPagination(prevState => ({...prevState, pageIndex: nextPage - 1}));
    }, []);

    const setPageSize = useCallback((nextSize: number) => {
        setPagination(prevState => ({...prevState, pageSize: nextSize}));
    }, []);

    return {
        pagination,
        setPagination,
        currentPage,
        setCurrentPage,
        setPageSize,
    };
};
