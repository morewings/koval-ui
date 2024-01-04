import type {ForwardedRef} from 'react';
import {useImperativeHandle, useRef} from 'react';

/** This hook allows to use forwarded ref inside component even if it's not provided. */
export const useInternalRef = <TElement = HTMLElement>(outerRef: ForwardedRef<TElement>) => {
    const innerRef = useRef<TElement | null>(null);
    useImperativeHandle<TElement | null, TElement | null>(outerRef, () => innerRef.current, [innerRef]);
    return innerRef;
};
