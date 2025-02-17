import type {ReactNode, SyntheticEvent} from 'react';
import {forwardRef, useMemo, useState} from 'react';
import classNames from 'classnames';
import {useLocalTheme} from 'css-vars-hook';

import {Picture} from '@/lib';
import {
    IconPlay,
    IconPause,
    IconVolume,
    IconVolumeOff,
    IconAudio,
    IconDownloadVideo,
} from '@/internal/Icons';
import {useInternalRef} from '@/internal/hooks/useInternalRef.ts';
import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import type {Source} from '@/internal/MediaEmbeds';
import {
    PlayModes,
    usePlay,
    getFileName,
    useLoadingState,
    getFormattedTime,
    useTime,
    useSound,
} from '@/internal/MediaEmbeds';
import rangeInputClasses from '@/internal/MediaEmbeds/RangeInput.module.css';

import classes from './Audio.module.css';

type Element = HTMLAudioElement;

export type Props = DataAttributes &
    LibraryProps & {
        /**
         * A URL for an image to be shown left to audio controls.
         * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio#poster
         */
        poster?: string;
        /**
         * Set a callback to run when the audio is buffered enough to play on the user side
         */
        onReady?: (event: SyntheticEvent<Element>) => void;
        /**
         * Set a callback to capture audio errors
         */
        onError?: (event: SyntheticEvent<Element>) => void;
        /**
         * Set a callback to run when the user plays the audio
         */
        onPlay?: (event: SyntheticEvent<Element>) => void;
        /**
         * Set a callback to run when the user pauses the audio
         */
        onPause?: (event: SyntheticEvent<Element>) => void;
        /**
         * Provide audio file url
         * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
         */
        src?: string;
        /**
         * Provide audio sources configs array. An advanced alternative to `src` prop
         * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
         */
        sources?: Source[];
        /**
         * Provide a title for the audio
         */
        title?: string;
        children?: ReactNode;
    };

export const Audio = forwardRef<HTMLAudioElement, Props>(
    (
        {
            children,
            className,
            onReady = () => {},
            onPlay = () => {},
            onPause = () => {},
            onError = () => {},
            src,
            poster,
            title,
            sources = [],
            ...nativeProps
        },
        refProp
    ) => {
        const embedRef = useInternalRef(refProp);

        const [duration, setDuration] = useState(0);

        const {handleLoadedMetaData, handleError, handleCanPlay, readyToPlay} = useLoadingState({
            embedRef,
            onError,
            onReady,
            setDuration,
        });

        const {handlePlay, handleTogglePlay, handlePause, playMode} = usePlay({
            embedRef,
            onPlay,
            onPause,
        });

        const {handleSetTime, currentTime} = useTime({embedRef, playMode});

        const {volume, handleSetVolume, muted, handleToggleMuted} = useSound({
            embedRef,
            mutedProp: false,
        });

        const {LocalRoot} = useLocalTheme();

        const theme = useMemo(() => ({background: `url(${poster})`}), [poster]);

        const PlayIcon =
            playMode === PlayModes.pause || playMode === PlayModes.pristine ? IconPlay : IconPause;

        return (
            <LocalRoot
                {...nativeProps}
                theme={theme}
                className={classNames(classes.wrapper, className)}>
                <div className={classes.title}>
                    <IconAudio className={classes.icon} />
                    <span className={classes.text}>
                        {title || getFileName(embedRef.current?.currentSrc)}
                    </span>
                    <a
                        className={classes.download}
                        href={embedRef.current?.currentSrc}
                        download={getFileName(embedRef.current?.currentSrc)}>
                        <IconDownloadVideo />
                    </a>
                </div>
                <div className={classNames(classes.audio, {[classes.noPoster]: !poster})}>
                    {poster && (
                        <Picture className={classes.poster} src={poster} height={111} width={111} />
                    )}
                    <div className={classes.playWrapper}>
                        <button
                            onClick={handleTogglePlay}
                            className={classNames(classes.playControl, {
                                [classes.loading]: !readyToPlay,
                            })}>
                            <PlayIcon className={classes.icon} />
                        </button>
                    </div>
                    <div className={classes.rangeControls}>
                        <div className={classes.control}>
                            <div className={classes.time}>
                                {getFormattedTime(currentTime)}/{getFormattedTime(duration)}
                            </div>
                            <div className={classes.volumeControl}>
                                <button className={classes.mutedButton} onClick={handleToggleMuted}>
                                    {muted ? (
                                        <IconVolumeOff className={classes.volumeIcon} />
                                    ) : (
                                        <IconVolume className={classes.volumeIcon} />
                                    )}
                                </button>
                                <input
                                    min={0}
                                    max={1}
                                    step={0.01}
                                    type="range"
                                    value={muted ? 0 : volume}
                                    onChange={handleSetVolume}
                                    className={classNames(
                                        rangeInputClasses.range,
                                        classes.volumeInput
                                    )}
                                />
                            </div>
                        </div>
                        <div className={classes.control}>
                            <input
                                onChange={handleSetTime}
                                value={currentTime}
                                type="range"
                                className={classNames(
                                    rangeInputClasses.range,
                                    classes.navigationInput
                                )}
                                name="seek"
                                min={0}
                                max={duration}
                                step={1}
                            />
                        </div>
                    </div>
                    <audio
                        className={classes.nativePlayer}
                        ref={embedRef}
                        src={src}
                        onPlay={handlePlay}
                        onPause={handlePause}
                        onLoadedMetadata={handleLoadedMetaData}
                        onCanPlay={handleCanPlay}
                        onError={handleError}
                        muted={muted}>
                        {sources.map(({src, type, mediaCondition}) => {
                            return (
                                <source key={src} src={src} type={type} media={mediaCondition} />
                            );
                        })}
                    </audio>
                    {children}
                </div>
            </LocalRoot>
        );
    }
);

Audio.displayName = 'Audio';
