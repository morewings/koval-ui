import type {ForwardedRef} from 'react';
import {useImperativeHandle, useRef} from 'react';

/** This hook allows to merge forwarded ref with component's inner ref. Inner ref has to be created by useRef. */
export const useInternalRef = <TElement = HTMLElement>(outerRef: ForwardedRef<TElement>) => {
    const innerRef = useRef<TElement | null>(null);
    useImperativeHandle<TElement | null, TElement | null>(outerRef, () => innerRef.current, [innerRef]);
    return innerRef;
};
