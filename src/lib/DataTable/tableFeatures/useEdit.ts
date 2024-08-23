import type {SetStateAction} from 'react';
import {useCallback, useMemo} from 'react';
import type {RowSelectionState, Table} from '@tanstack/react-table';

import {useDialogState} from '@/lib';
import {set} from '@/internal/utils/set.ts';

import type {TableData, TableRow, TableValue, EditState} from './../types.ts';
import {ProcessingModes} from './../types.ts';

export type Props = {
    rowSelection: RowSelectionState;
    table: Table<TableRow>;
    tableData: TableData;
    processingMode: keyof typeof ProcessingModes;
    setTableData: (value: SetStateAction<TableRow[]>) => void;
    onEdit: (editState: EditState) => void;
    clearSelection: () => void;
};

export const useEdit = ({
    rowSelection,
    table,
    tableData,
    processingMode,
    setTableData,
    onEdit,
    clearSelection,
}: Props) => {
    const {openDialog: showDeleteConfirmation} = useDialogState(
        table.options.meta?.deleteModalId as string
    );
    const {openDialog: showEditDialog} = useDialogState(table.options.meta?.editModalId as string);

    const handleDeleteRequest = useCallback(() => {
        showDeleteConfirmation();
    }, [showDeleteConfirmation]);

    const handleEditRequest = useCallback(() => {
        showEditDialog({selectionAmount: Object.keys(rowSelection).length});
    }, [rowSelection, showEditDialog]);

    const selectedRows = useMemo(
        () => Object.keys(rowSelection).map(rowIndex => Number(rowIndex)),
        [rowSelection]
    );

    const editRows = useCallback(
        (tableData: TableData, editedRows: number[], columnId: string, value: TableValue) => {
            // needs to be a copy to preserve immutability
            const result: TableData = [...tableData];
            editedRows.forEach(rowIndex => {
                // TODO: remove
                const path = table.getColumn(columnId)?.columnDef.meta?.accessorKey as string;
                set(result[rowIndex], path, value);
            });
            return result;
        },
        [table]
    );

    const handleEdit = useCallback(
        (columnId: string, value: string | number) => {
            const nextTableData = editRows(tableData, selectedRows, columnId, value);
            const editState: EditState = Object.fromEntries(
                selectedRows.map(rowIndex => [rowIndex, nextTableData[rowIndex]])
            );
            processingMode === ProcessingModes.internal && setTableData(nextTableData);
            onEdit(editState);

            clearSelection();
        },
        [clearSelection, editRows, onEdit, processingMode, selectedRows, setTableData, tableData]
    );

    const deleteRows = useCallback((tableData: TableData, deletedRows: Set<number>) => {
        return tableData.filter((_, i) => !deletedRows.has(i));
    }, []);

    const handleDelete = useCallback(() => {
        const nextTableData = deleteRows(tableData, new Set(selectedRows));
        processingMode === ProcessingModes.internal && setTableData(nextTableData);
        onEdit({});

        clearSelection();
    }, [deleteRows, tableData, selectedRows, processingMode, setTableData, onEdit, clearSelection]);

    return {handleDeleteRequest, handleDelete, handleEdit, handleEditRequest};
};
