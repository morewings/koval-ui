import type {MutableRefObject} from 'react';
import {useCallback} from 'react';
import {useState, useEffect} from 'react';
import {useDebouncedCallback} from 'use-debounce';

import {useEventListener} from '@/internal/hooks/useEventListener.ts';

/**
 * Utility hook. Tracks provided element overflow state. Subscribes to window resize events.
 */
export const useIsOverflow = <TElement extends HTMLElement | null>(
    ref: MutableRefObject<TElement>
) => {
    const [scrollWidth, setScrollWidth] = useState(0);
    const [scrollHeight, setScrollHeight] = useState(0);
    const [overflowY, setOverflowY] = useState<boolean | undefined>(undefined);
    const [overflowX, setOverflowX] = useState<boolean | undefined>(undefined);

    const handleResize = useCallback(() => {
        const {current} = ref;

        if (current) {
            const hasOverflowY = scrollHeight > current.offsetHeight;
            const hasOverflowX = scrollWidth > current.offsetWidth;
            setOverflowY(hasOverflowY);
            setOverflowX(hasOverflowX);
        }
    }, [ref, scrollHeight, scrollWidth]);

    const handleResizeDebounced = useDebouncedCallback(handleResize, 666, {trailing: true});

    useEventListener('resize', handleResizeDebounced);

    useEffect(() => {
        const {current} = ref;

        if (current) {
            setScrollWidth(current.scrollWidth);
            setScrollHeight(current.scrollHeight);
            const hasOverflowY = current.scrollHeight > current.offsetHeight;
            const hasOverflowX = current.scrollWidth > current.offsetWidth;

            setOverflowY(hasOverflowY);
            setOverflowX(hasOverflowX);
        }
    }, [ref]);

    return {overflowY, overflowX};
};
