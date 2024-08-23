import {useEffect, useState} from 'react';

import type {TableData} from './../types.ts';

export const useTableData = (tableDataProp: TableData) => {
    const [tableData, setTableData] = useState(() => [...tableDataProp]);

    useEffect(() => {
        setTableData(() => [...tableDataProp]);
    }, [tableDataProp]);
    return {tableData, setTableData};
};
