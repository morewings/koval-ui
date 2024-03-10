import type {MouseEvent, KeyboardEvent} from 'react';
import {useCallback} from 'react';

import {EventType, useEventListener} from '@/internal/hooks/useEventListener.ts';

/**
 * React hook. Triggers provided callback when ESC key pressed or registered click outside provided element
 */
export const useDismiss = (callback: () => void, element: HTMLElement | null, isOpen: boolean) => {
    const handleKeyDown = useCallback(
        (event: KeyboardEvent<HTMLElement>) => {
            if (isOpen && event.key === 'Escape') {
                callback();
            }
        },
        [callback, isOpen]
    );

    useEventListener(EventType.keydown, handleKeyDown);

    const handleMouseDown = useCallback(
        (event: MouseEvent<HTMLElement>) => {
            if (isOpen && (event.target as HTMLElement).contains(element)) {
                callback();
            }
        },
        [callback, isOpen, element]
    );

    useEventListener(EventType.mousedown, handleMouseDown);
};
