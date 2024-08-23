import type {Column} from './../types.ts';

const SMALL = 111;
const MEDIUM = 222;

export const demoColumns: Column[] = [
    {
        id: 'firstName',
        sortingFn: 'text',
        accessorKey: 'firstName',
        name: 'First name',
    },
    {
        id: 'lastName',
        sortingFn: 'text',
        accessorKey: 'lastName',
        name: 'Last name',
    },
    {
        id: 'companyName',
        sortingFn: 'text',
        accessorKey: 'business.companyName',
        name: 'Company',
        size: MEDIUM,
    },
    {
        id: 'randomInteger',
        sortingFn: 'basic',
        accessorKey: 'randomInteger',
        columnType: 'decimal',
        name: 'Integer',
        size: SMALL,
    },
    {
        id: 'randomDecimal',
        sortingFn: 'basic',
        accessorKey: 'randomDecimal',
        columnType: 'decimal',
        name: 'Decimal',
        size: MEDIUM,
    },
    {
        id: 'randomPercentage',
        sortingFn: 'basic',
        accessorKey: 'randomPercentage',
        columnType: 'percentage',
        name: 'Percent',
        size: SMALL,
        cellProps: {
            digitsConfig: {
                integer: {
                    minimum: 2,
                },
                fraction: {
                    maximum: 2,
                    minimum: 2,
                },
            },
        },
    },
    {
        id: 'moneyExample',
        sortingFn: 'basic',
        accessorKey: 'moneyExample',
        columnType: 'currency',
        name: 'Currency format',
        size: MEDIUM,
        cellProps: {
            digitsConfig: {
                fraction: {
                    maximum: 2,
                    minimum: 2,
                },
            },
        },
    },
    {
        id: 'unitExample',
        sortingFn: 'basic',
        accessorKey: 'unitExample',
        columnType: 'unit',
        name: 'Unit',
        size: MEDIUM,
        cellProps: {
            unit: 'gallon',
            unitDisplay: 'short',
        },
    },
    {
        id: 'dateExample',
        sortingFn: 'basic',
        accessorKey: 'dateExample',
        columnType: 'date',
        name: 'Random date',
        size: MEDIUM,
        cellProps: {
            year: 'numeric',
            weekday: 'short',
            day: '2-digit',
            month: 'short',
        },
    },
    {
        id: 'country',
        sortingFn: 'text',
        accessorKey: 'address.country',
        name: 'Country',
    },
    {
        id: 'phoneNumber',
        sortingFn: 'text',
        accessorKey: 'address.phoneNumber',
        name: 'Phone number',
    },
];
