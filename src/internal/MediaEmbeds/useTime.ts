import type {MutableRefObject} from 'react';
import {type ChangeEvent, useCallback, useEffect, useState} from 'react';

import {PlayModes} from './types.ts';

export type Props = {
    embedRef: MutableRefObject<HTMLMediaElement | null>;
    playMode: keyof typeof PlayModes;
};

export const useTime = ({embedRef, playMode}: Props) => {
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        const handler = () => {
            embedRef.current?.currentTime &&
                playMode === PlayModes.play &&
                embedRef.current?.currentTime !== currentTime &&
                setCurrentTime(embedRef.current?.currentTime);
        };
        const intervalId = setInterval(handler, 1000);
        return () => {
            clearInterval(intervalId);
        };
    }, [currentTime, playMode, embedRef]);

    const handleSetTime = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setCurrentTime(event.target.valueAsNumber);
            embedRef.current!.currentTime = event.target.valueAsNumber;
        },
        [embedRef]
    );

    return {handleSetTime, currentTime, setCurrentTime};
};
