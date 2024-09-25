import type {MutableRefObject} from 'react';
import {type ChangeEvent, useCallback, useEffect, useState} from 'react';

import {PlayModes} from './usePlay.ts';

export type Props = {
    videoRef: MutableRefObject<HTMLVideoElement | null>;
    playMode: keyof typeof PlayModes;
};

export const useTime = ({videoRef, playMode}: Props) => {
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        const handler = () => {
            videoRef.current?.currentTime &&
                playMode === PlayModes.play &&
                videoRef.current?.currentTime !== currentTime &&
                setCurrentTime(videoRef.current?.currentTime);
        };
        const intervalId = setInterval(handler, 1000);
        return () => {
            clearInterval(intervalId);
        };
    }, [currentTime, playMode, videoRef]);

    const handleSetTime = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setCurrentTime(event.target.valueAsNumber);
            videoRef.current!.currentTime = event.target.valueAsNumber;
        },
        [videoRef]
    );

    return {handleSetTime, currentTime, setCurrentTime};
};
