import {notUndefined, useVirtualizer} from '@tanstack/react-virtual';
import type {MutableRefObject} from 'react';

export type Props = {
    rowsCount: number;
    scrollRef: MutableRefObject<HTMLElement | null>;
    cellHeight: number;
    overscan: number;
};

export const useVirtualRows = ({rowsCount, scrollRef, cellHeight, overscan}: Props) => {
    const virtualizer = useVirtualizer({
        count: rowsCount,
        getScrollElement: () => scrollRef.current,
        estimateSize: () => cellHeight,
        overscan: overscan,
    });

    const virtualRows = virtualizer.getVirtualItems();

    const [before, after] =
        virtualRows.length > 0
            ? [
                  notUndefined(virtualRows[0]).start - virtualizer.options.scrollMargin,
                  virtualizer.getTotalSize() -
                      notUndefined(virtualRows[virtualRows.length - 1]).end,
              ]
            : [0, 0];

    return {virtualizer, virtualRows, before, after};
};
