import type {ForwardedRef, RefObject} from 'react';
import {useImperativeHandle} from 'react';

/** This hook allows to merge forwarded ref with component's inner ref. Inner ref has to be created by useRef. */
export const useInternalRef = <TElement = HTMLElement>(
    outerRef: ForwardedRef<TElement>,
    innerRef: RefObject<TElement>
) => {
    useImperativeHandle<TElement | null, TElement | null>(outerRef, () => innerRef.current, [innerRef]);
};
