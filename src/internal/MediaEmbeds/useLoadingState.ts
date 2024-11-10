import type {MutableRefObject, Dispatch, SetStateAction, SyntheticEvent} from 'react';
import {useCallback, useState} from 'react';

export type Props = {
    embedRef: MutableRefObject<HTMLMediaElement | null>;
    setDuration: Dispatch<SetStateAction<number>>;
    onReady: (event: SyntheticEvent<HTMLVideoElement>) => void;
    onError: (event: SyntheticEvent<HTMLVideoElement>) => void;
};

export const useLoadingState = ({embedRef, setDuration, onReady, onError}: Props) => {
    const handleLoadedMetaData = useCallback(() => {
        embedRef.current?.duration && setDuration(embedRef.current?.duration);
    }, [setDuration, embedRef]);

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
