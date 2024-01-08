import type {MutableRefObject} from 'react';
import {useEffect, useCallback} from 'react';

/**
 * React hook. Detects outside click and runs provided callback.
 * NB! Doesn't work with `useRef`!
 * @example
 * // define custom ref (element) getter and setter
 * const [element, setElement] = useState<HTMLDivElement | null>(null);
 * const callback = (e: MouseEvent) => {...}
 * useOutsideClick(element, callback)
 * // or
 * useOutsideClick([element1, element2, ...], callback)
 * // use custom element setter instead of useRef
 * return <div ref={setElement}></div>
 */
export const useOutsideClick = <TElement extends HTMLElement>(
    ref: MutableRefObject<TElement | null>,
    callback: (arg1?: unknown) => void
) => {
    const handleClick = useCallback(
        (e: Event) => {
            console.log('click', ref.current?.contains(e.target as TElement));
            if (ref.current && !ref.current.contains(e.target as TElement)) {
                callback();
            }
        },
        [callback, ref]
    );
    useEffect(() => {
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [handleClick]);
};
