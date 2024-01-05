import type {ForwardedRef, MutableRefObject} from 'react';
import {useImperativeHandle, useRef} from 'react';

/** This hook allows to merge forwarded ref with component's inner ref. Inner ref has to be created as MutableRefObject. */
export const useLinkRefs = <TElement = HTMLElement>(
    outerRef: ForwardedRef<TElement>,
    innerRef: MutableRefObject<TElement>
) => {
    const backupRef = useRef<TElement | null>(null);

    const normalizedRef = innerRef ? innerRef : backupRef;

    useImperativeHandle<TElement | null, TElement | null>(outerRef, () => normalizedRef.current, [normalizedRef]);
};
