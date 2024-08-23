import type {DisplayColumnDef, AccessorColumnDef, FilterFnOption} from '@tanstack/react-table';
import type {FC} from 'react';
import {type ComponentProps, useEffect, useMemo, useState} from 'react';

import {CellWrapper} from './../cells/CellWrapper.tsx';
import {ColumnHeaderCell} from './../cells/ColumnHeaderCell.tsx';
import {ColumnFooterCell} from './../cells/ColumnFooterCell.tsx';
import {ColumnTypes, CustomFilterFns, FilterModes, SortingModes} from './../types.ts';
import type {Column, TableRow, TableValue, TableData} from './../types.ts';
import {rowSelection} from './../columns/rowSelection.tsx';
import {ViewTextCell} from './../cells/ViewTextCell.tsx';
import {ViewDecimalCell} from './../cells/ViewDecimalCell.tsx';
import {ViewUnitCell} from './../cells/ViewUnitCell.tsx';
import {ViewDateCell} from './../cells/ViewDateCell.tsx';
import {ViewCurrencyCell} from './../cells/ViewCurrencyCell.tsx';
import {ViewPercentageCell} from './../cells/ViewPercentageCell.tsx';
import type {EditDialog} from './../dialogs/EditDialog.tsx';

const normalizeValue = (value: TableRow | TableValue): TableValue => {
    if (typeof value === 'string' || typeof value === 'number') {
        return value;
    }
    return value?.toString();
};

const cellMapping = {
    [ColumnTypes.text]: ViewTextCell,
    [ColumnTypes.unit]: ViewUnitCell,
    [ColumnTypes.date]: ViewDateCell,
    [ColumnTypes.decimal]: ViewDecimalCell,
    [ColumnTypes.currency]: ViewCurrencyCell,
    [ColumnTypes.percentage]: ViewPercentageCell,
    [ColumnTypes.select]: undefined,
};

const sortMapping = {
    [ColumnTypes.text]: SortingModes.text,
    [ColumnTypes.decimal]: SortingModes.basic,
    [ColumnTypes.currency]: SortingModes.basic,
    [ColumnTypes.percentage]: SortingModes.basic,
    [ColumnTypes.unit]: SortingModes.basic,
    [ColumnTypes.date]: SortingModes.basic,
    [ColumnTypes.select]: undefined,
};

const normalizeSortingFn = (
    columnType: keyof typeof ColumnTypes,
    sortingFnProp?: Column['sortingFn']
) => {
    if (sortingFnProp !== undefined) {
        return sortingFnProp;
    }

    return sortMapping[columnType];
};

const filterMapping = {
    [ColumnTypes.text]: FilterModes.includesString,
    [ColumnTypes.decimal]: FilterModes.inNumberRange,
    [ColumnTypes.currency]: FilterModes.inNumberRange,
    [ColumnTypes.percentage]: CustomFilterFns.isInPercentRange,
    [ColumnTypes.unit]: FilterModes.inNumberRange,
    [ColumnTypes.date]: CustomFilterFns.isInDateRange,
    [ColumnTypes.select]: undefined,
};

const normalizeFilterFn = (
    columnType: keyof typeof ColumnTypes,
    filterFnProp?: FilterFnOption<TableData> | keyof typeof CustomFilterFns
) => {
    if (filterFnProp !== undefined) {
        return filterFnProp;
    }

    return filterMapping[columnType];
};

export type Props = {
    columnsProp: Column[];
    selectable?: boolean;
};

const normalizeProp = <TColumn,>(hasSelectableColumn: boolean, columns: TColumn[]) => {
    return hasSelectableColumn ? [rowSelection, ...columns] : columns;
};

export const useTableColumns = ({columnsProp = [], selectable}: Props) => {
    const initialColumns = useMemo(() => {
        return normalizeProp(Boolean(selectable), [
            ...columnsProp.map(
                ({
                    id,
                    size = 166,
                    name,
                    accessorKey,
                    accessorFn,
                    editable = true,
                    filterable = true,
                    sortable = true,
                    pinnable = true,
                    columnCell,
                    sortingFn: sortingFnProp,
                    cellProps = {},
                    columnType = ColumnTypes.text,
                    filterFn: filterFnProp,
                    headerCell,
                    footerCell,
                    filterInput,
                }) => {
                    const CellComponent =
                        columnCell !== undefined ? columnCell : (cellMapping[columnType] as FC);
                    const HeaderComponent =
                        headerCell !== undefined ? headerCell : ColumnHeaderCell;
                    const FooterComponent =
                        footerCell !== undefined ? footerCell : ColumnFooterCell;

                    return {
                        meta: {
                            type: columnType,
                            editable,
                            // TODO: replace with columnProp
                            accessorKey,
                            cellProps,
                            name,
                            filterInput,
                        },
                        ...(accessorKey && {accessorKey}),
                        ...(accessorFn && {accessorFn}),
                        id,
                        sortingFn: normalizeSortingFn(columnType, sortingFnProp),
                        filterFn: normalizeFilterFn(columnType, filterFnProp),
                        size,
                        enableColumnFilter: filterable,
                        enableSorting: sortable,
                        enablePinning: pinnable,
                        // disabled tanstack features.
                        enableMultiSort: false,
                        enableGrouping: false,
                        enableResizing: false,
                        enableGlobalFilter: false,
                        enableHiding: false,
                        header: props => {
                            return (
                                <CellWrapper columnWidth={size}>
                                    <HeaderComponent headerContext={props} title={name} />
                                </CellWrapper>
                            );
                        },
                        cell: props => {
                            const value = normalizeValue(props.getValue());
                            return (
                                <CellWrapper columnWidth={size}>
                                    <CellComponent
                                        {...cellProps}
                                        cellContext={props}
                                        value={value}
                                    />
                                </CellWrapper>
                            );
                        },
                        footer: props => (
                            <CellWrapper columnWidth={size}>
                                <FooterComponent cellContext={props} />
                            </CellWrapper>
                        ),
                    } as
                        | DisplayColumnDef<TableData, TableRow | TableValue>
                        | AccessorColumnDef<TableData, TableRow | TableValue>;
                }
            ),
        ]);
    }, [columnsProp, selectable]);

    const [columns, setColumns] = useState(initialColumns);

    useEffect(() => {
        setColumns(initialColumns);
    }, [initialColumns]);

    const editableColumns = useMemo(
        () =>
            columnsProp
                .map(({id, name, columnType, editable = true}) => ({
                    id,
                    name,
                    type: columnType,
                    editable,
                }))
                .filter(({editable}) => editable) as ComponentProps<
                typeof EditDialog
            >['columnsConfig'],
        [columnsProp]
    );

    return {columns, setColumns, editableColumns};
};
