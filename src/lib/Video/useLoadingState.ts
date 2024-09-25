import type {MutableRefObject, Dispatch, SetStateAction} from 'react';
import {type SyntheticEvent, useCallback, useState} from 'react';

export type Props = {
    videoRef: MutableRefObject<HTMLVideoElement | null>;
    setDuration: Dispatch<SetStateAction<number>>;
    onReady: (event: SyntheticEvent<HTMLVideoElement>) => void;
    onError: (event: SyntheticEvent<HTMLVideoElement>) => void;
};

export const useLoadingState = ({videoRef, setDuration, onReady, onError}: Props) => {
    const handleLoadedMetaData = useCallback(() => {
        videoRef.current?.duration && setDuration(videoRef.current?.duration);
    }, [setDuration, videoRef]);

    const [readyToPlay, setReadyToPlay] = useState(false);

    const handleCanPlay = useCallback(
        (event: SyntheticEvent<HTMLVideoElement>) => {
            setReadyToPlay(true);
            onReady(event);
        },
        [onReady]
    );

    const handleError = useCallback(
        (event: SyntheticEvent<HTMLVideoElement>) => {
            onError(event);
        },
        [onError]
    );

    return {handleLoadedMetaData, readyToPlay, handleCanPlay, handleError};
};
