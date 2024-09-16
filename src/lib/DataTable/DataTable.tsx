import type {ReactNode} from 'react';
import {forwardRef, Fragment, useCallback, useMemo, useRef} from 'react';
import classNames from 'classnames';
import type {
    ColumnPinningState,
    PaginationState,
    SortingState,
    ColumnFiltersState,
    RowSelectionState,
    ColumnDef,
} from '@tanstack/react-table';
import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    getFilteredRowModel,
} from '@tanstack/react-table';
import {useLocalTheme} from 'css-vars-hook';

import {useResizeObserver} from '@/internal/hooks/useResizeObserverNew.ts';
import {useInternalRef} from '@/internal/hooks/useInternalRef.ts';
import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import {useBrowserLocale} from '@/internal/locale';
import type {Locale} from '@/internal/locale';
import {I, Table, Button} from '@/lib';
import {useInternalId} from '@/internal/hooks/useInternalId.ts';
import {IconFilterOff} from '@/internal/Icons';

import {useColumnFilters} from './tableFeatures/useColumnFilters.ts';
import classes from './DataTable.module.css';
import type {EditState, TableData, TableRow, Column} from './types.ts';
import {ProcessingModes, RenderModes} from './types.ts';
// import {columns} from './columns.tsx';
import {useColumnPinning} from './tableFeatures/useColumnPinning.ts';
import {TableCell} from './TableCell.tsx';
import {useVirtualRows} from './tableFeatures/useVirtualRows.ts';
import {useTableData} from './tableFeatures/useTableData.ts';
import {Pagination} from './Pagination.tsx';
import {usePagination} from './tableFeatures/usePagination.ts';
import {useSorting} from './tableFeatures/useSorting.ts';
import type {FilterConfig} from './dialogs/FilterDialog.tsx';
import {FilterDialog} from './dialogs/FilterDialog.tsx';
import {useRowSelection} from './tableFeatures/useRowSelection.ts';
import {useTableHeight} from './tableFeatures/useTableHeight.ts';
import {DeleteDialog} from './dialogs/DeleteDialog.tsx';
import {EditDialog} from './dialogs/EditDialog.tsx';
import {SelectableActions} from './SelectableActions.tsx';
import {useEdit} from './tableFeatures/useEdit.ts';
import {useTableColumns} from './tableFeatures/useTableColumns.tsx';
import {isInDateRange, isInPercentRange} from './filterFns.ts';

export type Props = DataAttributes &
    LibraryProps & {
        children?: ReactNode;
        /**
         * Provide table columns configuration
         * @see Column
         */
        columns: Column[];
        /**
         * Provide data for the table
         * @see TableData
         */
        tableData: TableData;
        /**
         * Provide a callback to capture table data changes
         * @see EditState
         */
        onEdit?: (editState: EditState) => void;
        /**
         * Control column pinning state externally
         * @see ColumnPinningState
         */
        columnPinning?: ColumnPinningState;
        /**
         * Control pagination state externally
         * @see PaginationState
         */
        pagination?: PaginationState;
        /**
         * Provide a callback to capture pagination changes
         * @see PaginationState
         */
        onPaginationChange?: (paginationState: PaginationState) => void;
        /**
         * Manage column filters externally
         * @see ColumnFiltersState
         */
        columnFilters?: ColumnFiltersState;
        /**
         * Provide a callback to capture column filters changes
         * @see ColumnFiltersState
         */
        onFiltersChange?: (filterState: ColumnFiltersState) => void;
        /**
         * Manage row selection externally
         * @see RowSelectionState
         */
        rowSelection?: RowSelectionState;
        /**
         * Provide a callback to capture row selection changes
         * @see RowSelectionState
         */
        onRowSelect?: (selectionState: RowSelectionState) => void;
        /**
         * Control table data sorting externally
         * @see SortingState
         */
        sorting?: SortingState;
        /**
         * Provide a callback to capture table data sorting changes
         * @see SortingState
         */
        onSortingChange?: (sortingState: SortingState) => void;
        /**
         * Configure how table data is processed inside or outside the component
         * @see ProcessingModes
         */
        processingMode?: keyof typeof ProcessingModes;
        /**
         * Select which type of table to render
         * @see RenderModes
         */
        renderMode?: keyof typeof RenderModes;
        /**
         * Set a controlled page count number for pagination. Required for renderMode="paginated-controlled"
         * @see https://morewings.github.io/koval-ui/?path=/story/components-datatable--paginated-controlled&args=tableData:rows100
         */
        pageCount?: number;
        /**
         * Provide a string with a BCP 47 language tag or an Intl.Locale instance,
         * or an array of such locale identifiers.
         * Used to format dates, numbers, and units.
         * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#locales
         * @see Locale
         */
        locale?: Locale;
        /**
         * Enable column selection
         */
        selectable?: boolean;
        /**
         * Set a height constrain to the data table. 'full' sets to 100% of viewport height
         */
        tableHeight?: number | 'full';
        /**
         * Set a caption text to render below the table
         */
        caption?: string;
    };

const CELL_HEIGHT = 42;

const OVERSCAN = 6;

const defaultPages = {
    pageIndex: 0,
    pageSize: 10,
};

const defaultSorting: SortingState = [];

const defaultFilters: ColumnFiltersState = [];

const defaultSelection: RowSelectionState = {};

export const DataTable = forwardRef<HTMLTableElement, Props>(
    (
        {
            children,
            className,
            tableData: tableDataProp = [],
            columnPinning: columnPinningProp,
            renderMode = RenderModes.virtual,
            pagination: paginationProp = defaultPages,
            onPaginationChange = () => {},
            onSortingChange = () => {},
            onFiltersChange = () => {},
            onRowSelect = () => {},
            onEdit = () => {},
            rowSelection: rowSelectionProp = defaultSelection,
            pageCount,
            sorting: sortingProp = defaultSorting,
            processingMode = ProcessingModes.internal,
            columnFilters: columnFiltersProp = defaultFilters,
            locale: localeProp,
            selectable = false,
            tableHeight: tableHeightProp = 'full',
            caption,
            columns: columnsProp = [],
            id: idProp,
            ...nativeProps
        },
        ref
    ) => {
        const id = useInternalId(idProp);

        const {tableData, setTableData} = useTableData(tableDataProp);

        const tableRef = useInternalRef(ref);

        const wrapperRef = useRef(null);

        const {height: tableHeight} = useResizeObserver(tableRef);

        const {LocalRoot} = useLocalTheme();

        const maxHeight = useTableHeight({tableHeightProp});

        const theme = useMemo(
            () => ({
                'table-height': tableHeight,
                'cell-height': CELL_HEIGHT,
                'max-height': maxHeight,
            }),
            [maxHeight, tableHeight]
        );

        const {columnPinning, setColumnPinning} = useColumnPinning({
            columnPinningProp,
            hasSelectableColumn: selectable,
        });

        const {pagination, setPagination, currentPage, setCurrentPage, setPageSize} = usePagination(
            {tableData, paginationProp, onPaginationChange}
        );

        const {sorting, setSorting} = useSorting({sortingProp, onSortingChange});

        const {columnFilters, setColumnFilters} = useColumnFilters({
            columnFiltersProp,
            onFiltersChange,
        });

        const browserLocale = useBrowserLocale();

        const {rowSelection, setRowSelection, clearSelection} = useRowSelection({
            rowSelectionProp,
            onRowSelect,
            processingMode,
        });

        const {columns, editableColumns} = useTableColumns({
            columnsProp,
            selectable,
        });

        const table = useReactTable({
            meta: {
                locale: localeProp || browserLocale,
                editModalId: `edit-modal-${id}`,
                filterModalId: `filter-modal-${id}`,
                deleteModalId: `delete-modal-${id}`,
            },
            data: tableData,
            columns: columns as ColumnDef<TableRow>[],
            getCoreRowModel: getCoreRowModel(),
            onColumnPinningChange: setColumnPinning,
            getPaginationRowModel:
                renderMode === RenderModes.paginated ? getPaginationRowModel() : undefined,
            onPaginationChange: renderMode === RenderModes.paginated ? setPagination : undefined,
            state: {
                pagination: renderMode === RenderModes.paginated ? pagination : undefined,
                columnPinning,
                sorting,
                columnFilters,
                rowSelection,
            },
            manualPagination: processingMode === ProcessingModes.external,
            pageCount: processingMode === ProcessingModes.external ? pageCount : undefined,
            getSortedRowModel: getSortedRowModel(),
            onSortingChange: setSorting,
            // Disabled until proper implementation
            enableMultiSort: false,
            manualSorting: processingMode === ProcessingModes.external,
            getFilteredRowModel: getFilteredRowModel(),
            onColumnFiltersChange: setColumnFilters,
            manualFiltering: processingMode === ProcessingModes.external,
            enableRowSelection: true,
            onRowSelectionChange: setRowSelection,
            filterFns: {
                isInDateRange,
                isInPercentRange,
            },
        });

        const {rows} = table.getRowModel();

        const {before, after, virtualRows} = useVirtualRows({
            rowsCount: rows.length,
            scrollRef: wrapperRef,
            overscan: OVERSCAN,
            cellHeight: CELL_HEIGHT,
        });

        const handleSetFilter = useCallback(
            ({filter, column}: FilterConfig) => {
                table.getColumn(column!)?.setFilterValue(filter);
            },
            [table]
        );

        const handleResetFilters = useCallback(() => {
            table.resetColumnFilters();
        }, [table]);

        const {handleEdit, handleDelete, handleDeleteRequest, handleEditRequest} = useEdit({
            rowSelection,
            onEdit,
            clearSelection,
            setTableData,
            table,
            tableData,
            processingMode,
        });

        const captionId = `caption-${id}`;

        return (
            <Fragment>
                <FilterDialog
                    tableContext={table}
                    id={table.options.meta?.filterModalId as string}
                    onApplyFiler={handleSetFilter}
                    columnFilters={columnFilters}
                />
                <EditDialog
                    id={table.options.meta?.editModalId as string}
                    selectionAmount={Object.keys(rowSelection).length}
                    columnsConfig={editableColumns}
                    onEdit={handleEdit}
                />
                <DeleteDialog
                    id={table.options.meta?.deleteModalId as string}
                    selectionAmount={Object.keys(rowSelection).length}
                    onDeleteConfirmation={handleDelete}
                />
                <LocalRoot theme={theme} className={classes.heightContainer}>
                    {selectable && (
                        <SelectableActions
                            selectedRows={Object.keys(rowSelection).length}
                            totalRows={table.getPreFilteredRowModel().rows.length}
                            onDeleteRequest={handleDeleteRequest}
                            onEditRequest={handleEditRequest}
                            onClear={clearSelection}
                        />
                    )}
                    <Table
                        aria-describedby={caption && captionId}
                        wrapperRef={wrapperRef}
                        wrapperClassName={classNames(classes.tableWrapper, {
                            // Needed to apply calculated height to the table to show small tables properly
                            [classes.paginated]: renderMode === RenderModes.paginated,
                            [classes.selectable]: selectable,
                            [classes.hasCaption]: Boolean(caption),
                        })}
                        {...nativeProps}
                        id={id}
                        className={classNames(classes.dataTable, className)}
                        ref={tableRef}>
                        <thead className={classes.tableHeader}>
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header, i, array) => {
                                        const fixLeft = i > 0 ? i + 1 : 0;
                                        const fixRight =
                                            i === array.length ? 0 : array.length - (i + 1);
                                        return (
                                            <TableCell
                                                as="th"
                                                key={header.id}
                                                leftMargin={
                                                    header.column.getStart('left') + fixLeft
                                                }
                                                rightMargin={
                                                    header.column.getAfter('right') + fixRight
                                                }
                                                isPinned={header.column.getIsPinned()}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column.columnDef.header,
                                                          header.getContext()
                                                      )}
                                            </TableCell>
                                        );
                                    })}
                                </tr>
                            ))}
                        </thead>
                        {renderMode === RenderModes.virtual && (
                            <tbody>
                                <Fragment>
                                    {before > 0 && (
                                        <tr>
                                            <td colSpan={columns.length} style={{height: before}} />
                                        </tr>
                                    )}
                                    {virtualRows.map(virtualRow => {
                                        const row = rows[virtualRow.index];
                                        return (
                                            <tr
                                                key={row.id}
                                                style={{
                                                    height: `${virtualRow.size}px`,
                                                }}>
                                                {row.getVisibleCells().map((cell, i, array) => {
                                                    const fixLeft = i > 0 ? i + 1 : 0;
                                                    const fixRight =
                                                        i === array.length
                                                            ? 0
                                                            : array.length - (i + 1);
                                                    return (
                                                        <TableCell
                                                            isHighlighted={Boolean(
                                                                cell.column.getIsSorted()
                                                            )}
                                                            as="td"
                                                            key={cell.id}
                                                            leftMargin={
                                                                cell.column.getStart('left') +
                                                                fixLeft
                                                            }
                                                            rightMargin={
                                                                cell.column.getAfter('right') +
                                                                fixRight
                                                            }
                                                            isPinned={cell.column.getIsPinned()}>
                                                            {flexRender(
                                                                cell.column.columnDef.cell,
                                                                cell.getContext()
                                                            )}
                                                        </TableCell>
                                                    );
                                                })}
                                            </tr>
                                        );
                                    })}
                                    {after > 0 && (
                                        <tr>
                                            <td colSpan={columns.length} style={{height: after}} />
                                        </tr>
                                    )}
                                </Fragment>
                            </tbody>
                        )}
                        {renderMode === RenderModes.paginated && (
                            <tbody>
                                {rows.map(row => (
                                    <tr key={row.id}>
                                        {row.getVisibleCells().map((cell, i, array) => {
                                            const fixLeft = i > 0 ? i + 1 : 0;
                                            const fixRight =
                                                i === array.length ? 0 : array.length - (i + 1);
                                            return (
                                                <TableCell
                                                    isHighlighted={Boolean(
                                                        cell.column.getIsSorted()
                                                    )}
                                                    as="td"
                                                    key={cell.id}
                                                    leftMargin={
                                                        cell.column.getStart('left') + fixLeft
                                                    }
                                                    rightMargin={
                                                        cell.column.getAfter('right') + fixRight
                                                    }
                                                    isPinned={cell.column.getIsPinned()}>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </TableCell>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        )}
                        {rows.length === 0 && (
                            <tbody>
                                <tr className={classes.noDataRow}>
                                    <td
                                        className={classes.noDataCell}
                                        colSpan={table.getAllColumns().length}>
                                        <div className={classes.noDataWarning}>
                                            <span>No data to render.</span>
                                            {columnFilters.length > 0 && (
                                                <Button
                                                    onClick={handleResetFilters}
                                                    prefix={IconFilterOff}
                                                    size="small"
                                                    variant="link">
                                                    Reset all filters
                                                </Button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        )}
                        <tfoot className={classes.tableFooter}>
                            {table.getFooterGroups().map(footerGroup => (
                                <tr key={footerGroup.id}>
                                    {footerGroup.headers.map((header, i, array) => {
                                        const fixLeft = i > 0 ? i + 1 : 0;
                                        const fixRight =
                                            i === array.length ? 0 : array.length - (i + 1);
                                        return (
                                            <TableCell
                                                as="th"
                                                key={header.id}
                                                leftMargin={
                                                    header.column.getStart('left') + fixLeft
                                                }
                                                rightMargin={
                                                    header.column.getAfter('right') + fixRight
                                                }
                                                isPinned={header.column.getIsPinned()}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column.columnDef.footer,
                                                          header.getContext()
                                                      )}
                                            </TableCell>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tfoot>
                    </Table>
                    {renderMode === RenderModes.paginated && (
                        <Pagination
                            rowsCount={tableData.length}
                            onPageSizeChange={setPageSize}
                            currentPage={currentPage}
                            pagesAmount={table.getPageCount()}
                            pageSize={pagination.pageSize}
                            setCurrentPage={setCurrentPage}
                        />
                    )}
                    {caption && (
                        <div id={captionId} className={classes.tableCaption}>
                            <I>{caption}</I>
                        </div>
                    )}
                </LocalRoot>
            </Fragment>
        );
    }
);

DataTable.displayName = 'DataTable';
