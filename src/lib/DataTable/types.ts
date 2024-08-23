import type {
    AccessorFn as AccessorFnTanstack,
    HeaderContext,
    CellContext,
    SortingFn as SortingFnTanstack,
    FilterFnOption,
} from '@tanstack/react-table';
import type {FC} from 'react';

import type {NumberProps} from '@/lib/Number';
import type {DateFormatOptions} from '@/lib/DateTime';

export enum Roles {
    manager = 'manager',
    developer = 'developer',
}

export type Row = {
    firstName: string;
    lastName: string;
    role: keyof typeof Roles;
    age: number;
    email: string;
    address: {
        city: string;
        country: string;
        streetAddress: string;
        postcode: string;
        phoneNumber: string;
    };
    business: {
        iban: string;
        companyName: string;
    };
};

export type TableValue = string | number;

export type TableRow = {[property: string]: TableRow | TableValue};
// export type TableRow = Record<string, TableValue>;

/**
 * Very liberal table data definition
 */
export type TableData = TableRow[];

export enum RenderModes {
    /**
     * Table renders as a virtualized list containing all cells
     */
    virtual = 'virtual',
    /**
     * Table renders as multiple pages of a certain size
     */
    paginated = 'paginated',
}

export enum ProcessingModes {
    /**
     * Data processed by the table. Semi-controlled mode, prop changes overwrite the state
     */
    internal = 'internal',
    /**
     * Data processed by the developer. Full controlled mode
     */
    external = 'external',
}

export enum ColumnTypes {
    text = 'text',
    decimal = 'decimal',
    percentage = 'percentage',
    currency = 'currency',
    unit = 'unit',
    date = 'date',
    select = 'select',
}

/**
 * Record which represents table change requested by the user. Key is equal to row index
 */
export type EditState = Record<number, TableRow>;

export type HeaderCell = FC<
    unknown & {
        title?: string;
        headerContext: HeaderContext<TableData, TableValue | TableRow>;
    }
>;

export type CellComponent = FC<
    unknown & {
        value?: TableValue;
        cellContext: CellContext<TableData, TableRow | TableValue>;
    }
>;

export type FooterCell = FC<
    unknown & {
        cellContext: HeaderContext<TableData, TableRow | TableValue>;
    }
>;

export type FilterInput = FC<
    unknown & {
        value: FilterValue;
        onChange: (value: FilterValue) => void;
    }
>;

export enum SortingModes {
    auto = 'auto',
    alphanumeric = 'alphanumeric',
    alphanumericCaseSensitive = 'alphanumericCaseSensitive',
    text = 'text',
    textCaseSensitive = 'textCaseSensitive',
    datetime = 'datetime',
    basic = 'basic',
}

export type SortingFn = SortingFnTanstack<TableData>;

export enum FilterModes {
    auto = 'auto',
    includesString = 'includesString',
    includesStringSensitive = 'includesStringSensitive',
    equalsString = 'equalsString',
    arrIncludes = 'arrIncludes',
    arrIncludesAll = 'arrIncludesAll',
    arrIncludesSome = 'arrIncludesSome',
    equals = 'equals',
    weakEquals = 'weakEquals',
    inNumberRange = 'inNumberRange',
}

export type ColumnFormatOptions = NumberProps | DateFormatOptions | Record<string, unknown>;

export enum CustomFilterFns {
    isInDateRange = 'isInDateRange',
    isInPercentRange = 'isInPercentRange',
}

export type AccessorFn = AccessorFnTanstack<TableData, TableRow | TableValue>;

/**
 * Table column config
 */
export type Column = {
    /**
     * Provide a unique id for the column
     */
    id: string;
    /**
     * Provide a human-readable title for the column
     */
    name: string;
    /**
     * Define a type of column data
     * @see ColumnTypes
     */
    columnType?: keyof typeof ColumnTypes;
    /**
     * Provide a custom React component to render column cells
     * @see CellComponent
     */
    columnCell?: CellComponent;
    /**
     * Set the width of the columns. Defaults to 166
     */
    size?: number;
    /**
     * Enable to allow user editing of the column
     */
    editable?: boolean;
    /**
     * Enable to allow user filtering of the column
     */
    filterable?: boolean;
    /**
     * Enable to make a column able to sort in ascending or descending order
     */
    sortable?: boolean;
    /**
     * Enable to make a column able to pin the left or right side
     */
    pinnable?: boolean;
    /**
     * Define a type of sorting to be used for the column. Can be one of supported modes or custom function
     * @see SortingModes
     * @see SortingFn
     */
    sortingFn?: keyof typeof SortingModes | SortingFn;
    /**
     * Define a type of filtering to be used for the column. Can be one of supported modes or custom function
     * @see FilterFnOption
     * @see CustomFilterFns
     */
    filterFn?: FilterFnOption<TableData> | keyof typeof CustomFilterFns;
    /**
     * Set props for each table cell. Useful for formatting dates, currencies, etc.
     * @see ColumnFormatOptions
     */
    cellProps?: ColumnFormatOptions;
    /**
     * Provide a custom React component to render the column header
     * @see HeaderCell
     */
    headerCell?: HeaderCell;
    /**
     * Provide a custom React component to render the column footer
     * @see FooterCell
     */
    footerCell?: FooterCell;
    /**
     * Provide a custom React component to render the column filter input
     * @see FilterInput
     */
    filterInput?: FilterInput;
} & (
    | {
          /**
           * Provide an accessor key to get column cell value from table data
           * @example
           * {
           *     accessorKey: "foo.bar[6].bazz"
           * }
           */
          accessorKey: string;
          /**
           * Provide an accessor function to get column cell value from table data
           */
          accessorFn?: never;
      }
    | {
          /**
           * Provide an accessor key to get column cell value from table data
           * @example
           * {
           *     accessorKey: "foo.bar[6].bazz"
           * }
           */
          accessorKey?: never;
          /**
           * Provide an accessor function to get column cell value from table data
           */
          accessorFn: AccessorFn;
      }
);

export type DateRangeFilterValue = string[];
export type RangeFilterValue = number[];

export type FilterValue = DateRangeFilterValue | RangeFilterValue | string;
