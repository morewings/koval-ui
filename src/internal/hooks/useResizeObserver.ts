import {useSafeLayoutEffect} from './useSafeLayoutEffect.ts';

/** Triggers callback when element resizes */
export const useResizeObserver = <TElement extends HTMLElement>(
    element: TElement | null | undefined,
    onResize: (element?: TElement | null) => void
) => {
    useSafeLayoutEffect(() => {
        const handleResize = () => {
            onResize(element);
        };

        if (element) {
            const observer = new ResizeObserver(handleResize);
            observer.observe(element);
            return () => {
                observer.disconnect();
            };
        }
    }, [onResize, element]);
};
