import {type MutableRefObject, useCallback, useEffect, useState} from 'react';

export const useFullscreen = (videoRef: MutableRefObject<HTMLVideoElement | null>) => {
    const [isFullScreen, setFullScreen] = useState(false);

    const handleFullscreen = useCallback(() => {
        videoRef.current?.requestFullscreen();
    }, [videoRef]);

    // this effect is required for Firefox, which doesn't display controls in full-screen mode
    useEffect(() => {
        const videoRefMemo = videoRef.current;
        const handleScreenChange = () => {
            setFullScreen(document.fullscreenElement === videoRef.current);
        };
        videoRefMemo?.addEventListener('fullscreenchange', handleScreenChange);
        return () => {
            videoRefMemo?.removeEventListener('fullscreenchange', handleScreenChange);
        };
    }, [videoRef]);

    return {isFullScreen, handleFullscreen};
};
