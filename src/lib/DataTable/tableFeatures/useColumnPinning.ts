import {useState, useEffect, useMemo} from 'react';
import type {ColumnPinningState} from '@tanstack/react-table';

import {ROW_SELECTION_ID} from './../columns/rowSelection.tsx';

const defaultColumnPinning = {};

export type Props = {
    columnPinningProp?: ColumnPinningState;
    hasSelectableColumn: boolean;
};

const normalizeProp = (hasSelectableColumn: boolean, columnPinningProp?: ColumnPinningState) => {
    const nextRight = columnPinningProp?.right ? columnPinningProp?.right : [];
    const nextLeft = columnPinningProp?.left ? columnPinningProp?.left : [];
    return {
        right: nextRight,
        left: hasSelectableColumn ? [ROW_SELECTION_ID, ...nextLeft] : nextLeft,
    };
};

export const useColumnPinning = ({
    columnPinningProp = defaultColumnPinning,
    hasSelectableColumn,
}: Props) => {
    const normalizedPinningState = useMemo(
        () => normalizeProp(hasSelectableColumn, columnPinningProp),
        [columnPinningProp, hasSelectableColumn]
    );

    const [columnPinning, setColumnPinning] = useState<ColumnPinningState>(normalizedPinningState);

    useEffect(() => {
        setColumnPinning(normalizedPinningState);
    }, [normalizedPinningState]);

    return {columnPinning, setColumnPinning};
};
