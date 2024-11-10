import type {SyntheticEvent, MutableRefObject} from 'react';
import {useCallback, useState} from 'react';

import {PlayModes} from './types.ts';

export type Props<TElement> = {
    onPlay: (event: SyntheticEvent<TElement>) => void;
    onPause: (event: SyntheticEvent<TElement>) => void;
    embedRef: MutableRefObject<TElement | null>;
};

export const usePlay = <TElement extends HTMLMediaElement>({
    onPlay,
    onPause,
    embedRef,
}: Props<TElement>) => {
    const [playMode, setPlayMode] = useState<PlayModes>(PlayModes.pristine);

    const handlePlay = useCallback(
        (event: SyntheticEvent<TElement>) => {
            setPlayMode(PlayModes.play);
            onPlay(event);
        },
        [onPlay]
    );

    const handlePause = useCallback(
        (event: SyntheticEvent<TElement>) => {
            setPlayMode(PlayModes.pause);
            onPause(event);
        },
        [onPause]
    );

    const handleTogglePlay = useCallback(() => {
        if (playMode === PlayModes.play) {
            embedRef.current?.pause();
            setPlayMode(PlayModes.pause);
        } else {
            embedRef.current?.play();
            setPlayMode(PlayModes.play);
        }
    }, [playMode, embedRef]);

    return {handlePlay, handlePause, handleTogglePlay, playMode};
};
