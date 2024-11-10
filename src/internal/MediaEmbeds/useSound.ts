import {type ChangeEvent, type MutableRefObject, useCallback, useEffect, useState} from 'react';

export type Props = {
    embedRef: MutableRefObject<HTMLMediaElement | null>;
    mutedProp: boolean;
};

export const useSound = ({embedRef, mutedProp}: Props) => {
    const [volume, setVolume] = useState(0);
    const handleSetVolume = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setVolume(event.target.valueAsNumber);
            embedRef.current!.volume = event.target.valueAsNumber;
        },
        [embedRef]
    );

    const [muted, setMuted] = useState(mutedProp);

    useEffect(() => {
        setMuted(mutedProp);
    }, [mutedProp]);

    const handleToggleMuted = useCallback(() => {
        setMuted(!muted);
    }, [muted]);

    useEffect(() => {
        setVolume(Number(embedRef.current?.volume || 0));
    }, [muted, embedRef]);

    return {volume, handleSetVolume, muted, handleToggleMuted, setVolume};
};
