import type {MouseEvent, KeyboardEvent, MutableRefObject} from 'react';
import {useCallback} from 'react';

import {EventType, useEventListener} from '@/internal/hooks/useEventListener.ts';

/**
 * React hook. Triggers provided callback when ESC key pressed or registered click outside provided element
 */
export const useDismiss = <TElement extends HTMLElement | null>(
    callback: () => void,
    ref: MutableRefObject<TElement>,
    isOpen: boolean
) => {
    const handleKeyDown = useCallback(
        (event: KeyboardEvent<TElement>) => {
            if (isOpen && event.key === 'Escape') {
                callback();
            }
        },
        [callback, isOpen]
    );

    useEventListener(EventType.keydown, handleKeyDown);

    const handleMouseDown = useCallback(
        (event: MouseEvent<TElement>) => {
            if (isOpen && (event.target as TElement)!.contains(ref.current)) {
                callback();
            }
        },
        [callback, isOpen, ref]
    );

    useEventListener(EventType.mousedown, handleMouseDown);
};
