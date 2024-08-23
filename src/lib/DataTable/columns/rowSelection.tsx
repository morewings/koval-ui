import type {ColumnDef} from '@tanstack/react-table';
import {createColumnHelper} from '@tanstack/react-table';

import {CellWrapper} from './../cells/CellWrapper.tsx';
import {RowSelectionCell} from './../cells/RowSelectionCell.tsx';
import type {TableValue} from './../types.ts';
import {ColumnTypes, type TableRow} from './../types.ts';

const columnHelper = createColumnHelper<TableRow>();

export const ROW_SELECTION_ID = 'koval-selectable';

export const rowSelection = columnHelper.display({
    id: ROW_SELECTION_ID,
    header: ({table, column}) => {
        return (
            <CellWrapper columnWidth={column.columnDef.meta?.width}>
                <RowSelectionCell
                    mode="inverted"
                    checked={table.getIsAllRowsSelected()}
                    onChange={table.getToggleAllRowsSelectedHandler()}
                    indeterminate={table.getIsSomeRowsSelected()}
                />
            </CellWrapper>
        );
    },
    cell: ({row, column}) => {
        return (
            <CellWrapper columnWidth={column.columnDef.meta?.width}>
                <RowSelectionCell
                    checked={row.getIsSelected()}
                    disabled={!row.getCanSelect()}
                    onChange={row.getToggleSelectedHandler()}
                    indeterminate={false}
                />
            </CellWrapper>
        );
    },
    enableColumnFilter: false,
    size: 51,
    meta: {
        type: ColumnTypes.select,
        width: 51,
        editable: false,
    },
    footer: ({table, column}) => {
        return (
            <CellWrapper columnWidth={column.columnDef.meta?.width}>
                <RowSelectionCell
                    mode="inverted"
                    checked={table.getIsAllRowsSelected()}
                    onChange={table.getToggleAllRowsSelectedHandler()}
                    indeterminate={table.getIsSomeRowsSelected()}
                />
            </CellWrapper>
        );
    },
}) as ColumnDef<TableRow, TableValue>;
