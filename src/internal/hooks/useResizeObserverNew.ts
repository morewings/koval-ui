import {type MutableRefObject, useEffect, useMemo, useRef, useState} from 'react';

// Unfinished. TODO: make it work.
export function useResizeObserver<TElement extends HTMLElement | null>(
    ref: MutableRefObject<TElement>
) {
    const frameID = useRef(0);

    const [size, setSize] = useState<ResizeObserverSize>();

    const result = useMemo(
        () => ({width: size?.inlineSize, height: size?.blockSize}),
        [size?.blockSize, size?.inlineSize]
    );

    const observer = useMemo(
        () =>
            typeof window !== 'undefined'
                ? new ResizeObserver((entries: ResizeObserverEntry[]) => {
                      const entry = entries[0];

                      if (entry) {
                          cancelAnimationFrame(frameID.current);

                          frameID.current = requestAnimationFrame(() => {
                              if (ref.current) {
                                  setSize(entry.borderBoxSize[0]);
                              }
                          });
                      }
                  })
                : null,
        [] // eslint-disable-line react-hooks/exhaustive-deps
    );

    useEffect(() => {
        if (ref.current) {
            observer?.observe(ref.current, {box: 'border-box'});
        }

        return () => {
            observer?.disconnect();

            if (frameID.current) {
                cancelAnimationFrame(frameID.current);
            }
        };
    }, [ref.current]); // eslint-disable-line react-hooks/exhaustive-deps

    return result;
}

export function useElementSize<TElement extends HTMLElement | null>(
    ref: MutableRefObject<TElement>
) {
    const {width, height} = useResizeObserver(ref);
    return {width, height};
}
