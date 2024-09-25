import type {SyntheticEvent, MutableRefObject} from 'react';
import {useCallback, useState} from 'react';

export type Props = {
    onPlay: (event: SyntheticEvent<HTMLVideoElement>) => void;
    onPause: (event: SyntheticEvent<HTMLVideoElement>) => void;
    videoRef: MutableRefObject<HTMLVideoElement | null>;
};

export enum PlayModes {
    play = 'play',
    pause = 'pause',
    pristine = 'pristine',
}

export const usePlay = ({onPlay, onPause, videoRef}: Props) => {
    const [playMode, setPlayMode] = useState<PlayModes>(PlayModes.pristine);

    const handlePlay = useCallback(
        (event: SyntheticEvent<HTMLVideoElement>) => {
            setPlayMode(PlayModes.play);
            onPlay(event);
        },
        [onPlay]
    );

    const handlePause = useCallback(
        (event: SyntheticEvent<HTMLVideoElement>) => {
            setPlayMode(PlayModes.pause);
            onPause(event);
        },
        [onPause]
    );

    const handleTogglePlay = useCallback(() => {
        if (playMode === PlayModes.play) {
            videoRef.current?.pause();
            setPlayMode(PlayModes.pause);
        } else {
            videoRef.current?.play();
            setPlayMode(PlayModes.play);
        }
    }, [playMode, videoRef]);

    return {handlePlay, handlePause, handleTogglePlay, playMode};
};
