import {useEffect, useRef} from 'react';

export enum EventType {
    keydown = 'keydown',
    mousedown = 'mousedown',
    animationend = 'animationend',
}

export const useEventListener = <TEvent, TElement extends HTMLElement | null>(
    eventType: keyof typeof EventType,
    callback: (event: TEvent) => void,
    elementProp?: TElement
) => {
    const element = elementProp ?? window;
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        if (element == null) return;
        const handler = ((e: TEvent) =>
            callbackRef.current(e)) as unknown as EventListenerOrEventListenerObject;
        element.addEventListener(eventType, handler);

        return () => element.removeEventListener(eventType, handler);
    }, [eventType, element]);
};
