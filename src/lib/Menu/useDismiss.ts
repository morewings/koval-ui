import type {MouseEvent, KeyboardEvent} from 'react';
import {useCallback} from 'react';

import {EventType, useEventListener} from '@/internal/hooks/useEventListener.ts';

export const useDismiss = (callback: (arg0: boolean) => void, element: HTMLElement | null, isOpen: boolean) => {
    const handleKeyDown = useCallback(
        (event: KeyboardEvent<HTMLElement>) => {
            if (isOpen && event.key === 'Escape') {
                callback(false);
            }
        },
        [callback, isOpen]
    );

    useEventListener(EventType.keydown, handleKeyDown);

    const handleMouseDown = useCallback(
        (event: MouseEvent<HTMLElement>) => {
            if (isOpen && (event.target as HTMLElement).contains(element)) {
                callback(false);
            }
        },
        [callback, isOpen, element]
    );

    useEventListener(EventType.mousedown, handleMouseDown);
};
