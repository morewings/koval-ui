import {useCallback, useEffect, useMemo, useState} from 'react';
import type {RowSelectionState, Updater} from '@tanstack/react-table';

import {ProcessingModes} from './../types.ts';

export type Props = {
    onRowSelect: (selectionState: RowSelectionState) => void;
    rowSelectionProp: RowSelectionState;
    processingMode: keyof typeof ProcessingModes;
};

export const useRowSelection = ({rowSelectionProp, onRowSelect, processingMode}: Props) => {
    const isClient = processingMode === ProcessingModes.internal;
    const [rowSelection, setRowSelection] = useState<RowSelectionState>(rowSelectionProp);
    useEffect(() => {
        setRowSelection(rowSelectionProp);
    }, [rowSelectionProp]);

    useEffect(() => {
        onRowSelect(rowSelection);
    }, [onRowSelect, rowSelection]);

    const clearSelection = useCallback(() => {
        processingMode === ProcessingModes.internal && setRowSelection({});
        onRowSelect({});
    }, [onRowSelect, processingMode]);

    const handleRowSelection = useMemo(() => {
        if (isClient) {
            return setRowSelection;
        } else {
            return (updater: Updater<RowSelectionState>) => {
                if (typeof updater === 'function') {
                    onRowSelect(updater(rowSelection) as RowSelectionState);
                } else {
                    onRowSelect(updater);
                }
            };
        }
    }, [isClient, onRowSelect, rowSelection]);

    return {rowSelection, setRowSelection: handleRowSelection, clearSelection};
};
