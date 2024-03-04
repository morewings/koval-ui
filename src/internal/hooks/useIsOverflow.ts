import type {MutableRefObject} from 'react';
import {useState} from 'react';

import {useSafeLayoutEffect} from '@/internal/hooks/useSafeLayoutEffect.ts';

export const useIsOverflow = <TElement extends HTMLElement | null>(ref: MutableRefObject<TElement>) => {
    const [overflowY, setOverflowY] = useState<boolean | undefined>(undefined);
    const [overflowX, setOverflowX] = useState<boolean | undefined>(undefined);

    useSafeLayoutEffect(() => {
        const {current} = ref;

        // const trigger = () => {
        //     const hasOverflowY = current.scrollHeight > current.clientHeight;
        //     const hasOverflowX = current.scrollWidth > current.clientWidth;
        //
        //     setOverflowY(hasOverflowY);
        //     setOverflowX(hasOverflowX);
        // };

        if (current) {
            const hasOverflowY = current.scrollHeight > current.clientHeight;
            const hasOverflowX = current.scrollWidth > current.clientWidth;

            setOverflowY(hasOverflowY);
            setOverflowX(hasOverflowX);
        }
    }, [ref]);

    return {overflowY, overflowX};
};
