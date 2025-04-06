import {useEffect, useRef} from 'react';

export enum EventType {
    keydown = 'keydown',
    mousedown = 'mousedown',
    animationend = 'animationend',
    resize = 'resize',
}

/**
 * Utility hook to subscribe to browser events.
 * @param eventType - Select an event to subscribe to
 * @param callback - Event callback function
 * @param element - Provide an HTMLElement to attach event handlers. Optional, defaults to window
 */
export const useEventListener = <TEvent, TElement extends HTMLElement | null>(
    eventType: keyof typeof EventType,
    callback: (event: TEvent) => void,
    element?: TElement
) => {
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        const targetElement = element ?? window;
        if (targetElement == null) return;
        const handler = ((e: TEvent) =>
            callbackRef.current(e)) as unknown as EventListenerOrEventListenerObject;
        targetElement.addEventListener(eventType, handler);

        return () => targetElement.removeEventListener(eventType, handler);
    }, [element, eventType]);
};
