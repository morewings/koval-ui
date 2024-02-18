import type {MutableRefObject} from 'react';
import {useMemo, useState, useEffect} from 'react';

export const useIsInViewport = (ref: MutableRefObject<HTMLElement>) => {
    const [isIntersecting, setIsIntersecting] = useState(false);

    const observer = useMemo(() => new IntersectionObserver(([entry]) => setIsIntersecting(entry.isIntersecting)), []);

    useEffect(() => {
        observer.observe(ref.current);

        return () => {
            observer.disconnect();
        };
    }, [ref, observer]);

    return isIntersecting;
};
