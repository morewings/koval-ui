import type {MutableRefObject} from 'react';
import {useEffect, useState} from 'react';

export const useTextLength = (ref: MutableRefObject<HTMLDivElement | null>) => {
    const [length, setLength] = useState<number>();
    useEffect(() => {
        const textEncoder = new TextEncoder();
        setLength(textEncoder.encode(ref.current?.innerText).length);
    }, [ref]);
    return length;
};
