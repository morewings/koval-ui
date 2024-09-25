import {type ChangeEvent, type MutableRefObject, useCallback, useEffect, useState} from 'react';

export type Props = {
    videoRef: MutableRefObject<HTMLVideoElement | null>;
    mutedProp: boolean;
};

export const useSound = ({videoRef, mutedProp}: Props) => {
    const [volume, setVolume] = useState(0);
    const handleSetVolume = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setVolume(event.target.valueAsNumber);
            videoRef.current!.volume = event.target.valueAsNumber;
        },
        [videoRef]
    );

    const [muted, setMuted] = useState(mutedProp);

    useEffect(() => {
        setMuted(mutedProp);
    }, [mutedProp]);

    const handleToggleMuted = useCallback(() => {
        setMuted(!muted);
    }, [muted]);

    useEffect(() => {
        setVolume(Number(videoRef.current?.volume || 0));
    }, [muted, videoRef]);

    return {volume, handleSetVolume, muted, handleToggleMuted, setVolume};
};
