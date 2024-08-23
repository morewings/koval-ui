import {useState, useEffect} from 'react';
import type {SortingState} from '@tanstack/react-table';

// import type {ProcessingModes} from './types.ts';

export type Props = {
    sortingProp: SortingState;
    onSortingChange: (sortingState: SortingState) => void;
    // processingMode?: keyof typeof ProcessingModes;
};

export const useSorting = ({sortingProp, onSortingChange}: Props) => {
    const [sorting, setSorting] = useState<SortingState>(sortingProp);

    useEffect(() => {
        setSorting(sortingProp);
    }, [sortingProp]);

    useEffect(() => {
        onSortingChange(sorting);
    }, [onSortingChange, sorting]);

    return {sorting, setSorting};
};
