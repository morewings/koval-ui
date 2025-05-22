import type {MutableRefObject} from 'react';
import {useState, useEffect} from 'react';

import {useResizeObserver} from '@/internal/hooks/useResizeObserverNew.ts';

export type Props = {
    width: number;
    ref: MutableRefObject<HTMLElement | null>;
};

export const useResponsiveWidth = ({width, ref}: Props) => {
    const [responsiveWidth, setResponsiveWidth] = useState(width);
    const rect = useResizeObserver(ref);
    useEffect(() => {
        typeof rect?.width === 'number' && setResponsiveWidth(rect?.width);
    }, [rect?.width]);
    return responsiveWidth;
};
