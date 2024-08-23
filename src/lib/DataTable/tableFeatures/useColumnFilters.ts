import type {ColumnFiltersState} from '@tanstack/react-table';
import {useState, useEffect} from 'react';

export type Props = {
    columnFiltersProp: ColumnFiltersState;
    onFiltersChange: (filterState: ColumnFiltersState) => void;
};

export const useColumnFilters = ({columnFiltersProp, onFiltersChange}: Props) => {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(columnFiltersProp);
    useEffect(() => {
        setColumnFilters(columnFiltersProp);
    }, [columnFiltersProp]);

    useEffect(() => {
        onFiltersChange(columnFilters);
    }, [onFiltersChange, columnFilters]);

    return {columnFilters, setColumnFilters};
};
