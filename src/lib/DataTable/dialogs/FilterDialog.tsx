import type {ComponentProps, FC, ChangeEvent} from 'react';
import {useMemo, useState, useCallback, useEffect, memo} from 'react';
import type {ColumnFiltersState, Table} from '@tanstack/react-table';

import {Dialog, useDialogState} from '@/lib/Dialog';
import {FormField} from '@/lib/FormField';
import {Select} from '@/lib/Select';
import {IconFilter, IconFilterOff, IconColumns} from '@/internal/Icons';

import classes from './Dialog.module.css';
import type {TableRow, FilterValue} from './../types.ts';
import {ColumnTypes} from './../types.ts';
import {NumberRangeField} from './NumberRangeField.tsx';
import {DateRangeField} from './DateRangeField.tsx';
import {TextField} from './TextField.tsx';

export type FilterConfig = {filter: FilterValue | string; column?: string};

export type Props = {
    id: string;
    columnsList?: string[];
    onApplyFiler: (filter: FilterConfig) => void;
    columnFilters: ColumnFiltersState;
    tableContext: Table<TableRow>;
};

const fieldMapping = {
    [ColumnTypes.text]: TextField,
    [ColumnTypes.currency]: NumberRangeField,
    [ColumnTypes.decimal]: NumberRangeField,
    [ColumnTypes.unit]: NumberRangeField,
    [ColumnTypes.percentage]: NumberRangeField,
    [ColumnTypes.select]: TextField,
    [ColumnTypes.date]: DateRangeField,
};

export const FilterDialog: FC<Props> = memo(({id, onApplyFiler, columnFilters, tableContext}) => {
    const {dialogParams, closeDialog} = useDialogState(id);

    const columnsConfig = useMemo(
        () =>
            tableContext
                .getAllColumns()
                .map(column => {
                    return {
                        id: column.id,
                        name: column.columnDef.meta?.name as string,
                        type: column.columnDef.meta?.type as keyof typeof ColumnTypes,
                        filterable: column?.getCanFilter(),
                    };
                })
                .filter(({filterable}) => filterable),
        [tableContext]
    );

    const [selectedColumn, setSelectedColumn] = useState(
        dialogParams?.columnId as string | undefined
    );

    useEffect(() => {
        dialogParams?.columnId && setSelectedColumn(dialogParams?.columnId as string);
    }, [dialogParams?.columnId]);

    const handleColumnSelect = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedColumn(event.target.value);
    }, []);

    const [selectedType, setSelectedType] = useState<keyof typeof ColumnTypes>(ColumnTypes.text);

    useEffect(() => {
        const nextType =
            columnsConfig.find(({id}) => id === selectedColumn)?.type ||
            (ColumnTypes.text as keyof typeof ColumnTypes);
        setSelectedType(nextType);
    }, [columnsConfig, selectedColumn, setSelectedType]);

    const FilterField = useMemo(
        () => selectedColumn && tableContext.getColumn(selectedColumn)?.columnDef.meta?.filterInput,
        [selectedColumn, tableContext]
    );

    const InputField = useMemo(
        () => FilterField || fieldMapping[selectedType],
        [FilterField, selectedType]
    );

    const step = useMemo(() => {
        const isPercentage =
            selectedColumn &&
            tableContext.getColumn(selectedColumn)?.columnDef.meta?.type === ColumnTypes.percentage;
        return isPercentage ? 0.01 : undefined;
    }, [selectedColumn, tableContext]);

    const tableFilterValue = useMemo(() => {
        const columnFilter = columnFilters.find(({id}) => id === selectedColumn);
        return columnFilter?.value !== undefined ? (columnFilter?.value as FilterValue) : '';
    }, [columnFilters, selectedColumn]);

    const [filterValue, setFilterValue] = useState(tableFilterValue);

    const hasFilter = Array.isArray(filterValue)
        ? filterValue.every(value => Boolean(value))
        : Boolean(filterValue);

    useEffect(() => {
        setFilterValue(tableFilterValue);
    }, [tableFilterValue]);

    const handleFilterChange = useCallback((value: string | FilterValue) => {
        setFilterValue(value);
    }, []);

    const handleApplyFilter = useCallback(() => {
        onApplyFiler({column: selectedColumn, filter: filterValue});
        closeDialog();
    }, [closeDialog, filterValue, onApplyFiler, selectedColumn]);

    const handleResetFilter = useCallback(() => {
        onApplyFiler({column: selectedColumn, filter: ''});
        closeDialog();
    }, [closeDialog, onApplyFiler, selectedColumn]);

    const actions = useMemo<ComponentProps<typeof Dialog>['actions']>(
        () => [
            [
                {title: 'Reset filter', onClick: handleResetFilter, icon: IconFilterOff},
                {
                    title: 'Apply filter',
                    icon: IconFilter,
                    onClick: handleApplyFilter,
                    type: 'success' as const,
                    disabled: !hasFilter,
                },
            ] as const,
        ],
        [handleApplyFilter, handleResetFilter, hasFilter]
    );

    const cellProps = useMemo(() => {
        return typeof selectedColumn === 'string'
            ? tableContext.getColumn(selectedColumn)?.columnDef.meta?.cellProps
            : {};
    }, [selectedColumn, tableContext]);

    return (
        <Dialog
            animation="scale-in"
            showCloseButton={false}
            dialogTitle="Filter column"
            id={id}
            className={classes.dialog}
            actions={actions}>
            <div className={classes.fieldset}>
                <FormField className={classes.field} label="Column:">
                    <Select
                        prefix={IconColumns}
                        value={selectedColumn}
                        onChange={handleColumnSelect}>
                        {columnsConfig.map(({id, name}) => (
                            <option key={id} value={id}>
                                {name}
                            </option>
                        ))}
                    </Select>
                </FormField>
                {/*                <FormField className={classes.field} label="Operator:">
                    <Select onChange={handleOperatorSelect}>
                        <option value="includes">Includes</option>
                        <option value="equals">Equals</option>
                    </Select>
                </FormField>*/}
                <InputField
                    step={step}
                    value={filterValue}
                    onChange={handleFilterChange}
                    cellProps={cellProps}
                />
            </div>
        </Dialog>
    );
});

FilterDialog.displayName = 'FilterDialog';
