import type {MutableRefObject} from 'react';
import {useMemo, useState, useEffect} from 'react';

export const useIsInViewport = (ref: MutableRefObject<HTMLElement | null>) => {
    const [isIntersecting, setIsIntersecting] = useState(false);

    const observer = useMemo(() => new IntersectionObserver(([entry]) => setIsIntersecting(entry.isIntersecting)), []);

    useEffect(() => {
        ref.current && observer.observe(ref.current);

        return () => {
            observer.disconnect();
        };
    }, [ref, observer]);

    return isIntersecting;
};
