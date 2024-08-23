import '@tanstack/react-table';
import type {Locale} from '@/internal/locale';

import type {ColumnTypes, ColumnFormatOptions, FilterInput} from './types.ts';

declare module '@tanstack/react-table' {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions,@typescript-eslint/no-unused-vars
    interface ColumnMeta<TData extends RowData, TValue> {
        type: keyof typeof ColumnTypes;
        width: number;
        editable?: boolean;
        accessorKey?: string;
        name?: string;
        cellProps?: ColumnFormatOptions;
        filterInput?: FilterInput;
    }
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions,@typescript-eslint/no-unused-vars
    interface TableMeta<TData extends RowData> {
        locale: Locale;
        editModalId: string;
        filterModalId: string;
        deleteModalId: string;
    }
}
