import type {SyntheticEvent} from 'react';
import {useState, useCallback, forwardRef, useMemo} from 'react';
import classNames from 'classnames';
import {useLocalTheme} from 'css-vars-hook';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import {
    IconPause,
    IconPlay,
    IconVolume,
    IconVolumeOff,
    IconFullscreen,
    IconPictureInPicture,
    IconDownloadVideo,
    IconVideo,
} from '@/internal/Icons';
import {useInternalRef} from '@/internal/hooks/useInternalRef.ts';

import classes from './Video.module.css';
import {usePlay, PlayModes} from './usePlay.ts';
import {useTime} from './useTime.ts';
import {useFullscreen} from './useFullscreen.ts';
import {useSound} from './useSound.ts';
import {useLoadingState} from './useLoadingState.ts';

export type Source = {
    src: string;
    /**
     * Provide the source video MIME type
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source#type
     */
    type?: string;
    /**
     * Provide media condition for the source video
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source#media
     * @see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries
     */
    mediaCondition?: string;
};

enum PreloadModes {
    none = 'none',
    metadata = 'metadata',
    auto = 'auto',
}

export type Props = DataAttributes &
    LibraryProps & {
        /**
         * Set the width of the video file
         */
        width?: number | '100%';
        /**
         * Set the height of the video file
         */
        height?: number;
        /**
         * A URL for an image to be shown while the video is downloading.
         * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#poster
         */
        poster?: string;
        /**
         * Enable to automatically seek back to the start upon reaching the end of the video
         * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#loop
         */
        loop?: boolean;
        /**
         * Enable to silence the audio during playback
         * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#muted
         */
        muted?: boolean;
        /**
         * Select loading mode
         * `none` – video shouldn't be preloaded.
         * `metadata` – only video metadata (for example, length) is fetched.
         * `auto` – whole video file can be downloaded.
         * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#preload
         */
        preload?: keyof typeof PreloadModes;
        /**
         * Enable to play video automatically when it loads
         * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#autoplay
         */
        autoPlay?: boolean;
        /**
         * Enable Picture-in-picture mode
         * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#disablepictureinpicture
         */
        enablePictureInPicture?: boolean;
        /**
         * Display the download video button
         */
        showDownload?: boolean;
        /**
         * Show the fullscreen mode button
         */
        enableFullscreen?: boolean;
        /**
         * Show video play controls
         */
        showControls?: boolean;
        /**
         * Show video title
         */
        showTitle?: boolean;
        /**
         * Provide a title for the video
         */
        title?: string;
        /**
         * Set a callback to run when the video is buffered enough to play on the user side
         */
        onReady?: (event: SyntheticEvent<HTMLVideoElement>) => void;
        /**
         * Set a callback to capture video errors
         */
        onError?: (event: SyntheticEvent<HTMLVideoElement>) => void;
        /**
         * Set a callback to run when the user plays the video
         */
        onPlay?: (event: SyntheticEvent<HTMLVideoElement>) => void;
        /**
         * Set a callback to run when the user pauses the video
         */
        onPause?: (event: SyntheticEvent<HTMLVideoElement>) => void;
    } & (
        | {
              /**
               * Provide video url
               * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#src
               */
              src?: string;
              /**
               * Provide video sources configs array. An advanced alternative to `src` prop
               * @see SourceDensity
               * @see SourceWidth
               */
              sources?: never;
          }
        | {
              /**
               * Provide video url
               * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#src
               */
              src?: never;
              /**
               * Provide video sources configs array. An advanced alternative to `src` prop
               * @see SourceDensity
               * @see SourceWidth
               */
              sources?: Source[];
          }
    );

const getFormattedTime = (totalSeconds = 0) => {
    const minutes = new Intl.NumberFormat(undefined, {minimumIntegerDigits: 2}).format(
        Math.floor(totalSeconds / 60)
    );
    const seconds = new Intl.NumberFormat(undefined, {minimumIntegerDigits: 2}).format(
        Math.floor(totalSeconds % 60)
    );
    return `${minutes}:${seconds}`;
};

const getFileName = (url?: string) => {
    const splitted = url?.split('/') || [];
    return splitted[splitted.length - 1];
};

const normalizeSize = (size?: number | string) => {
    if (typeof size === 'string') {
        return size;
    } else {
        return `${size}px`;
    }
};

export const Video = forwardRef<HTMLVideoElement, Props>(
    (
        {
            className,
            width = '100%',
            height,
            poster,
            src,
            sources = [],
            loop = false,
            muted: mutedProp = false,
            preload = PreloadModes.auto,
            autoPlay = false,
            enablePictureInPicture = true,
            showDownload = true,
            enableFullscreen = true,
            showControls = true,
            showTitle = true,
            title,
            onReady = () => {},
            onError = () => {},
            onPlay = () => {},
            onPause = () => {},
            ...nativeProps
        },
        ref
    ) => {
        const videoRef = useInternalRef(ref);

        const {playMode, handleTogglePlay, handlePlay, handlePause} = usePlay({
            videoRef,
            onPlay,
            onPause,
        });

        const [duration, setDuration] = useState(0);

        const {handleLoadedMetaData, handleError, handleCanPlay, readyToPlay} = useLoadingState({
            videoRef,
            onError,
            onReady,
            setDuration,
        });

        const {isFullScreen, handleFullscreen} = useFullscreen(videoRef);

        const {volume, handleSetVolume, muted, handleToggleMuted} = useSound({videoRef, mutedProp});

        const {handleSetTime, currentTime} = useTime({videoRef, playMode});

        const IconTogglePlay = useMemo(() => {
            return playMode === PlayModes.pause || playMode === PlayModes.pristine
                ? IconPlay
                : IconPause;
        }, [playMode]);

        const IconToggleVolume = useMemo(() => {
            return muted ? IconVolumeOff : IconVolume;
        }, [muted]);

        const handlePip = useCallback(() => {
            videoRef.current?.requestPictureInPicture?.();
        }, [videoRef]);

        const {LocalRoot} = useLocalTheme();

        const theme = useMemo(
            () => ({width: normalizeSize(width), height: normalizeSize(height)}),
            [height, width]
        );

        return (
            <LocalRoot theme={theme} className={classes.container}>
                <video
                    {...nativeProps}
                    title={title}
                    src={src}
                    poster={poster}
                    className={classNames(classes.video, className)}
                    controls={isFullScreen}
                    width={width}
                    loop={loop}
                    muted={muted}
                    preload={preload}
                    autoPlay={autoPlay}
                    disablePictureInPicture={!enablePictureInPicture}
                    onCanPlay={handleCanPlay}
                    onError={handleError}
                    onLoadedMetadata={handleLoadedMetaData}
                    onPause={handlePause}
                    onPlay={handlePlay}
                    ref={videoRef}>
                    {sources.map(({src, type, mediaCondition}) => {
                        return <source key={src} src={src} type={type} media={mediaCondition} />;
                    })}
                </video>
                {playMode === PlayModes.pristine && (
                    <div className={classes.overlayButton}>
                        <button
                            onClick={handleTogglePlay}
                            className={classNames({[classes.loading]: !readyToPlay})}>
                            <IconPlay className={classes.icon} />
                        </button>
                    </div>
                )}
                {playMode !== PlayModes.pristine && showTitle && (
                    <div className={classes.overlayTitle}>
                        <IconVideo className={classes.icon} />
                        <span className={classes.title}>
                            {title || getFileName(videoRef.current?.currentSrc)}
                        </span>
                        {showDownload && (
                            <a
                                href={videoRef.current?.currentSrc}
                                download={getFileName(videoRef.current?.currentSrc)}
                                className={classes.button}>
                                <IconDownloadVideo className={classes.icon} />
                            </a>
                        )}
                    </div>
                )}
                {playMode !== PlayModes.pristine && showControls && (
                    <div className={classes.overlayControls}>
                        <div className={classes.timelineContainer}>
                            <input
                                className={classes.range}
                                type="range"
                                onChange={handleSetTime}
                                value={currentTime}
                                name="seek"
                                min={0}
                                max={duration}
                                step={1}
                            />
                        </div>
                        <div className={classes.buttonsContainer}>
                            <div className={classes.left}>
                                <button className={classes.buttonBig} onClick={handleTogglePlay}>
                                    <IconTogglePlay className={classes.icon} />
                                </button>
                                <div className={classes.timeStamp}>
                                    <span className={classes.time}>
                                        {getFormattedTime(currentTime)}
                                    </span>
                                    <span className={classes.spacer}>/</span>
                                    <span className={classes.time}>
                                        {getFormattedTime(duration)}
                                    </span>
                                </div>
                            </div>

                            <div className={classes.right}>
                                <fieldset className={classes.volume}>
                                    <button className={classes.button} onClick={handleToggleMuted}>
                                        <IconToggleVolume className={classes.icon} />
                                    </button>
                                    <input
                                        type="range"
                                        name="volume"
                                        min={0}
                                        max={1}
                                        step={0.01}
                                        value={muted ? 0 : volume}
                                        onChange={handleSetVolume}
                                        className={classes.range}
                                    />
                                </fieldset>
                                {enablePictureInPicture && (
                                    <button className={classes.button} onClick={handlePip}>
                                        <IconPictureInPicture className={classes.icon} />
                                    </button>
                                )}
                                {enableFullscreen && (
                                    <button className={classes.button} onClick={handleFullscreen}>
                                        <IconFullscreen className={classes.icon} />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </LocalRoot>
        );
    }
);

Video.displayName = 'Video';
