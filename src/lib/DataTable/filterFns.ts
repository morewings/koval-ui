import type {FilterFn} from '@tanstack/react-table';

import type {TableData} from './types.ts';

export const isInDateRange: FilterFn<TableData> = (row, columnId, [from, to]: Date[]) => {
    const cellDate = new Date(row.getValue(columnId));
    return cellDate.getTime() >= from.getTime() && cellDate.getTime() <= to.getTime();
};

isInDateRange.resolveFilterValue = ([from, to]) => {
    return [new Date(from), new Date(to)];
};

export const isInPercentRange: FilterFn<TableData> = (row, columnId, [from, to]: number[]) => {
    const cellValue = (row.getValue(columnId) as number) * 100;
    return cellValue >= from && cellValue <= to;
};
