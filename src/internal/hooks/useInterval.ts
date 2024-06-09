import {useEffect, useRef} from 'react';

type Props = {
    callback: () => void;
    interval: number | null;
    condition?: boolean;
};

export const useInterval = ({callback, interval, condition = true}: Props) => {
    const savedCallback = useRef<Props['callback']>();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        let id: NodeJS.Timeout;
        const tick = () => {
            savedCallback.current?.();
        };
        if (interval !== null && condition) {
            id = setInterval(tick, interval);
        }
        return () => {
            id && clearInterval(id);
        };
    }, [condition, interval]);
};
