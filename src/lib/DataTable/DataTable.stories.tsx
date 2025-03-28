import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';
import {useMemo, useEffect, useState, useCallback} from 'react';
import type {
    ColumnFiltersState,
    PaginationState,
    RowSelectionState,
    SortingState,
} from '@tanstack/react-table';

import {get} from '@/internal/utils/get.ts';
import {localeControl} from '@/internal/locale';

import type {Props} from './DataTable.tsx';
import {DataTable} from './DataTable.tsx';
import {generateData} from './mocks/generateData.ts';
import {demoColumns} from './mocks/demoColumns.ts';
import type {EditState} from './types.ts';
import {ProcessingModes, RenderModes} from './types.ts';

const SEED = 666;

const defaultData = generateData(10, SEED);

const meta = {
    title: 'Components/DataTable',
    component: DataTable,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
    },
    args: {
        onPaginationChange: fn(),
        onSortingChange: fn(),
        onFiltersChange: fn(),
        onRowSelect: fn(),
        onEdit: fn(),
        tableData: defaultData,
        locale: undefined,
        tableHeight: undefined,
        selectable: true,
        caption: 'Koval demo table',
        columns: demoColumns,
    },
    argTypes: {
        columns: {
            table: {
                disable: true,
            },
        },
        onEdit: {
            table: {
                disable: true,
            },
        },
        onRowSelect: {
            table: {
                disable: true,
            },
        },
        onFiltersChange: {
            table: {
                disable: true,
            },
        },
        onSortingChange: {
            table: {
                disable: true,
            },
        },
        onPaginationChange: {
            table: {
                disable: true,
            },
        },
        className: {
            table: {
                disable: true,
            },
        },
        id: {
            table: {
                disable: true,
            },
        },
        renderMode: {
            table: {
                disable: true,
            },
        },
        processingMode: {
            table: {
                disable: true,
            },
        },
        role: {
            table: {
                disable: true,
            },
        },
        tableData: {
            options: ['rows0', 'rows10', 'rows100', 'rows1000', 'rows10000'],
            mapping: {
                rows0: [],
                rows10: defaultData,
                rows100: generateData(100, SEED),
                rows1000: generateData(1000, SEED),
                rows10000: generateData(10000, SEED),
            },
            control: {
                type: 'radio',
                labels: {
                    rows0: '0 rows',
                    rows10: '10 rows',
                    rows100: '100 rows',
                    rows1000: '1000 rows',
                    rows10000: '10000 rows',
                },
            },
        },
        tableHeight: {
            control: {
                type: 'number',
            },
        },
        locale: localeControl,
        columnPinning: {
            options: ['noPinning', 'left1', 'left2', 'right1', 'right2', 'bothSides'],
            mapping: {
                noPinning: {},
                left1: {
                    left: ['firstName'],
                },
                left2: {
                    left: ['firstName', 'lastName'],
                },
                right1: {
                    right: ['role'],
                },
                right2: {
                    right: ['role', 'age'],
                },
                bothSides: {
                    left: ['firstName'],
                    right: ['role'],
                },
            },
            control: {
                type: 'radio',
                labels: {
                    noPinning: 'No pinned columns',
                    left1: '1 column pinned left',
                    left2: '2 columns pinned left',
                    right1: '1 column pinned right',
                    right2: '2 columns pinned right',
                    bothSides: '2 columns pinned both sides',
                },
            },
        },
        pagination: {
            options: ['noPagination', 'rows1', 'rows5', 'rows10', 'rows30', 'rows50'],
            mapping: {
                noPagination: undefined,
                rows1: {pageSize: 1, pageIndex: 0},
                rows5: {pageSize: 5, pageIndex: 0},
                rows10: {pageSize: 10, pageIndex: 0},
                rows30: {pageSize: 30, pageIndex: 0},
                rows50: {pageSize: 50, pageIndex: 0},
            },
            control: {
                type: 'radio',
                labels: {
                    noPagination: 'No pagination state',
                    rows1: '1 row per page',
                    rows5: '5 rows per page',
                    rows10: '10 rows per page',
                    rows30: '30 rows per page',
                    rows50: '50 rows per page',
                },
            },
        },
        sorting: {
            options: [
                'noSorting',
                'sortingNameAsc',
                'sortingNameDesc',
                'sortingAgeAsc',
                'sortingAgeDesc',
                'sortingIbanAsc',
                'sortingIbanDesc',
            ],
            mapping: {
                noSorting: [],
                sortingNameAsc: [{id: 'lastName', desc: false}],
                sortingNameDesc: [{id: 'lastName', desc: true}],
                sortingAgeAsc: [{id: 'age', desc: false}],
                sortingAgeDesc: [{id: 'age', desc: true}],
                sortingIbanAsc: [{id: 'business_iban', desc: false}],
                sortingIbanDesc: [{id: 'business_iban', desc: true}],
            },
            control: {
                type: 'radio',
                labels: {
                    noSorting: 'No sorting',
                    sortingNameAsc: 'Sorting by name: ASC',
                    sortingNameDesc: 'Sorting by name: DESC',
                    sortingAgeAsc: 'Sorting by age: ASC',
                    sortingAgeDesc: 'Sorting by age: DESC',
                    sortingIbanAsc: 'Sorting by IBAN: ASC',
                    sortingIbanDesc: 'Sorting by IBAN: DESC',
                },
            },
        },
        columnFilters: {
            options: ['noFilters', 'filterLastName', 'filterAge'],
            mapping: {
                noFilters: [],
                filterLastName: [{id: 'lastName', value: 'ko'}],
                filterAge: [{id: 'age', value: '6'}],
            },
            control: {
                type: 'radio',
                labels: {
                    noFilters: 'No filter',
                    filterLastName: 'Filter Last name column: "ko"',
                    filterAge: 'Filter Age column: "6"',
                },
            },
        },
        rowSelection: {
            options: ['noSelection', 'oneSelection', 'sixSelection'],
            mapping: {
                noSelection: {},
                oneSelection: {1: true},
                sixSelection: {1: true, 2: true, 3: true, 4: true, 5: true, 6: true},
            },
            control: {
                type: 'radio',
                labels: {
                    noSelection: 'No selected rows',
                    oneSelection: '1 selected row',
                    sixSelection: '6 selected rows',
                },
            },
        },
    },
} as Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<Props>;

export const Primary: Story = {
    name: 'Virtual',
    render: args => {
        return <DataTable {...args} />;
    },
    args: {
        renderMode: RenderModes.virtual,
        processingMode: ProcessingModes.internal,
    },
    argTypes: {
        pagination: {
            table: {
                disable: true,
            },
        },
        pageCount: {
            table: {
                disable: true,
            },
        },
    },
};

/* Sorting resets filter in this story. The goal was to show Data Table controlled behavior. */
export const VirtualControlled: Story = {
    name: 'Virtual & external 🚧',
    render: ({
        tableData: tableDataProp,
        sorting: sortingProp,
        onSortingChange,
        columnFilters: columnFiltersProp,
        onFiltersChange,
        onRowSelect,
        rowSelection: rowSelectionProp,
        onEdit,
        ...restProps
    }) => {
        const [tableData, setTableData] = useState(tableDataProp);
        useEffect(() => {
            setTableData(tableDataProp);
        }, [tableDataProp]);

        const [sorting, setSorting] = useState(sortingProp);

        useEffect(() => {
            setSorting(sortingProp);
        }, [sortingProp]);

        const handleSortingChange = useCallback(
            (sortingState: SortingState) => {
                if (sortingState.length > 0) {
                    const nextTableData = [...tableDataProp].sort((a, b) => {
                        const isDesc = sortingState[0].desc;
                        const id = sortingState[0].id.replace('_', '.');
                        const left = get(a, id);
                        const right = get(b, id);
                        const compare = String(left).localeCompare(String(right));
                        return !isDesc ? compare : compare * -1;
                    });
                    setTableData(nextTableData);
                } else {
                    setTableData(tableDataProp);
                }
                setSorting(sortingState);
                onSortingChange?.(sortingState);
            },
            [onSortingChange, tableDataProp]
        );

        const [columnFilters, setColumnFilters] = useState(columnFiltersProp);

        useEffect(() => {
            setColumnFilters(columnFiltersProp);
        }, [columnFiltersProp]);

        const handleFiltersChange = useCallback(
            (filtersState: ColumnFiltersState) => {
                let nextTableData = [...tableDataProp];
                filtersState.forEach(({id, value}) => {
                    nextTableData = nextTableData.filter(rowData =>
                        String(rowData[id])
                            .toLowerCase()
                            .includes((value as string).toLowerCase())
                    );
                });
                setTableData(nextTableData);
                setColumnFilters(filtersState);
                onFiltersChange?.(filtersState);
            },
            [onFiltersChange, tableDataProp]
        );

        // simplified implementation
        const [rowSelection, setRowSelection] = useState(rowSelectionProp);

        useEffect(() => {
            setRowSelection(rowSelectionProp);
        }, [rowSelectionProp]);

        const handleRowSelect = useCallback(
            (nextRowSelection: RowSelectionState) => {
                onRowSelect?.(nextRowSelection);
                setRowSelection(nextRowSelection);
            },
            [onRowSelect]
        );

        const handleRowEdit = useCallback(
            (editState: EditState) => {
                Object.entries(editState).forEach(([rowIndex, rowEdit]) => {
                    setTableData(oldTableData => {
                        return [...oldTableData].toSpliced(Number(rowIndex), 1, rowEdit);
                    });
                });
                if (Object.entries(editState).length === 0) {
                    setTableData([]);
                }
                onEdit?.(editState);
            },
            [onEdit]
        );

        return (
            <DataTable
                {...restProps}
                onEdit={handleRowEdit}
                rowSelection={rowSelection}
                onRowSelect={handleRowSelect}
                onSortingChange={handleSortingChange}
                tableData={tableData}
                sorting={sorting}
                onFiltersChange={handleFiltersChange}
                columnFilters={columnFilters}
            />
        );
    },
    args: {
        renderMode: RenderModes.virtual,
        processingMode: ProcessingModes.external,
    },
    argTypes: {
        pagination: {
            table: {
                disable: true,
            },
        },
        pageCount: {
            table: {
                disable: true,
            },
        },
    },
};

export const Paginated: Story = {
    render: args => {
        return <DataTable {...args} />;
    },
    args: {
        renderMode: RenderModes.paginated,
        processingMode: ProcessingModes.internal,
        tableHeight: 700,
    },
};

const defaultPagination = {pageSize: 10, pageIndex: 0};

/* Sorting resets filter in this story. The goal was to show Data Table controlled behavior. */
export const PaginatedControlled: Story = {
    name: 'Paginated & external 🚧️',
    render: ({
        tableData: tableDataProp,
        pagination: paginationProp,
        onPaginationChange,
        sorting: sortingProp,
        onSortingChange,
        onFiltersChange,
        onRowSelect,
        columnFilters: columnFiltersProp,
        rowSelection: rowSelectionProp,
        onEdit,
        ...restProps
    }) => {
        const [tableData, setTableData] = useState(tableDataProp);

        useEffect(() => {
            setTableData(tableDataProp);
        }, [tableDataProp]);

        const [pagination, setPagination] = useState(paginationProp || defaultPagination);

        useEffect(() => {
            setPagination(paginationProp || defaultPagination);
        }, [paginationProp]);

        const handlePaginationChange = useCallback(
            (state: PaginationState) => {
                onPaginationChange?.(state);
                setPagination(state);
            },
            [onPaginationChange]
        );

        const currentPage = useMemo(() => {
            const startIndex = pagination.pageSize * pagination.pageIndex;
            const endIndex = Math.min(startIndex + pagination.pageSize, tableData.length);
            return pagination && tableData?.slice(startIndex, endIndex);
        }, [pagination, tableData]);

        const [pageCount, setPageCount] = useState(
            Math.floor(tableDataProp.length / pagination.pageSize)
        );

        useEffect(() => {
            setPageCount(Math.floor(tableDataProp.length / pagination.pageSize));
        }, [pagination.pageSize, tableDataProp.length]);

        const [sorting, setSorting] = useState(sortingProp);
        useEffect(() => {
            setSorting(sortingProp);
        }, [sortingProp]);
        const handleSortingChange = useCallback(
            (sortingState: SortingState) => {
                if (sortingState.length > 0) {
                    const nextTableData = [...tableDataProp].sort((a, b) => {
                        const isDesc = sortingState[0].desc;
                        const id = sortingState[0].id.replace('_', '.');
                        const left = get(a, id);
                        const right = get(b, id);
                        const compare = String(left).localeCompare(String(right));
                        return !isDesc ? compare : compare * -1;
                    });
                    setTableData(nextTableData);
                    setPageCount(Math.floor(nextTableData.length / pagination.pageSize));
                }
                setSorting(sortingState);
                onSortingChange?.(sortingState);
            },
            [onSortingChange, pagination.pageSize, tableDataProp]
        );

        const [columnFilters, setColumnFilters] = useState(columnFiltersProp);

        useEffect(() => {
            setColumnFilters(columnFiltersProp);
        }, [columnFiltersProp]);

        const handleFiltersChange = useCallback(
            (filtersState: ColumnFiltersState) => {
                let nextTableData = [...tableDataProp];
                filtersState.forEach(({id, value}) => {
                    nextTableData = nextTableData.filter(rowData =>
                        String(rowData[id])
                            .toLowerCase()
                            .includes((value as string).toLowerCase())
                    );
                });
                setTableData(nextTableData);
                setColumnFilters(filtersState);
                onFiltersChange?.(filtersState);
                setPageCount(Math.floor(nextTableData.length / pagination.pageSize));
            },
            [onFiltersChange, pagination.pageSize, tableDataProp]
        );

        // simplified implementation
        const [rowSelection, setRowSelection] = useState(rowSelectionProp);

        useEffect(() => {
            setRowSelection(rowSelectionProp);
        }, [rowSelectionProp]);

        const handleRowSelect = useCallback(
            (nextRowSelection: RowSelectionState) => {
                onRowSelect?.(nextRowSelection);
                setRowSelection(nextRowSelection);
            },
            [onRowSelect]
        );

        const handleRowEdit = useCallback(
            (editState: EditState) => {
                Object.entries(editState).forEach(([rowIndex, rowEdit]) => {
                    setTableData(oldTableData => {
                        return [...oldTableData].toSpliced(Number(rowIndex), 1, rowEdit);
                    });
                });
                if (Object.entries(editState).length === 0) {
                    setTableData([]);
                }
                onEdit?.(editState);
            },
            [onEdit]
        );

        return (
            <DataTable
                {...restProps}
                rowSelection={rowSelection}
                onRowSelect={handleRowSelect}
                columnFilters={columnFilters}
                onFiltersChange={handleFiltersChange}
                pageCount={pageCount}
                tableData={currentPage}
                pagination={pagination}
                onPaginationChange={handlePaginationChange}
                sorting={sorting}
                onSortingChange={handleSortingChange}
                onEdit={handleRowEdit}
            />
        );
    },
    args: {
        renderMode: RenderModes.paginated,
        pagination: defaultPagination,
        processingMode: ProcessingModes.external,
        tableHeight: 700,
    },
};

export const Maximum: Story = {
    name: '50 thousand rows 🐌',
    render: args => {
        return <DataTable {...args} />;
    },
    args: {
        renderMode: RenderModes.virtual,
        processingMode: ProcessingModes.internal,
        tableData: generateData(50000, SEED),
    },
    argTypes: {
        renderMode: {
            table: {
                disable: false,
            },
        },
    },
    parameters: {
        controls: {include: ['renderMode']},
    },
};
