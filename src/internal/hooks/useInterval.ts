import {useEffect, useRef} from 'react';

type Props = {
    callback: () => void;
    interval: number | null;
    condition?: boolean;
};

export const useInterval = ({callback, interval, condition = true}: Props) => {
    const savedCallback = useRef<() => void>();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        const tick = () => {
            savedCallback.current?.();
        };
        if (interval !== null && condition) {
            const id = setInterval(tick, interval);
            return () => clearInterval(id);
        }
    }, [condition, interval]);
};
