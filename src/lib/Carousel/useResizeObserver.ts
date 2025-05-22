import type {MutableRefObject} from 'react';
import {useEffect, useState, useDeferredValue} from 'react';

export const useResizeObserver = (ref: MutableRefObject<HTMLElement | null>) => {
    const [rect, setRect] = useState<DOMRectReadOnly>();

    const deferredRect = useDeferredValue(rect);

    useEffect(() => {
        const observer = new ResizeObserver(() => {
            if (ref.current) {
                const boundingRect = ref.current.getBoundingClientRect();
                setRect(boundingRect);
            }
        });
        ref.current && observer.observe(ref.current);

        return () => observer.disconnect();
    }, [ref]);

    return deferredRect;
};
