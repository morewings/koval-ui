import type {KeyboardEvent} from 'react';
import {useCallback, useEffect, useRef, useState} from 'react';

import {EventType, useEventListener} from '@/internal/hooks/useEventListener.ts';

/**
 * React hook. Makes provided HTMLElement retain focus inside. Works conditionally using last parameter.
 */
export const useFocusTrap = (element: HTMLElement | null, isOpen: boolean, condition = true) => {
    const focusableElementsRef = useRef<NodeListOf<HTMLElement>>(null);
    const [elements, setElements] = useState<(HTMLElement | null)[]>([]);
    useEffect(() => {
        if (condition && isOpen) {
            // @ts-expect-error TS2540: Cannot assign to current because it is a read-only property.
            focusableElementsRef.current = element?.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const first = focusableElementsRef.current ? focusableElementsRef.current[0] : null;
            const last = focusableElementsRef.current
                ? focusableElementsRef.current[focusableElementsRef.current.length - 1]
                : null;
            setElements([first, last]);
        }
    }, [isOpen, element, condition]);

    useEffect(() => {
        condition && isOpen && elements[0]?.focus();
    }, [condition, elements, isOpen]);

    const handleTabKeyPress = useCallback(
        (event: KeyboardEvent) => {
            const [first, last] = elements;
            if (condition && isOpen && event.key === 'Tab') {
                if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault();
                    last!.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault();
                    first!.focus();
                }
            }
        },
        [condition, elements, isOpen]
    );

    useEventListener(EventType.keydown, handleTabKeyPress);
};
