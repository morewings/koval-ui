import type {ReactNode} from 'react';
import {useCallback, useId, forwardRef, useRef} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import type {LanguageCodes} from '@/internal/locale';
import {IconPlay, IconPause, IconRepeat} from '@/internal/Icons';

import classes from './TextToSpeech.module.css';
import {useSpeechSynth} from './useSpeechSynth.ts';

export type Props = DataAttributes &
    LibraryProps & {
        children?: ReactNode;
        /**
         * Provide a string with a BCP 47 language tag or an Intl.Locale instance,
         * or an array of such locale identifiers. Defaults to user setting
         * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames/DisplayNames#locales
         */
        language?: keyof typeof LanguageCodes;
        /**
         * Provide a text label for play action
         */
        playLabel?: string;
        /**
         * Provide a text label for pause action
         */
        pauseLabel?: string;
        /**
         * Provide a text label for restart action
         */
        restartLabel?: string;
        /**
         * Callback when a user starts speech
         */
        onSpeak?: (event: SpeechSynthesisEvent) => void;
        /**
         * Callback when a user pauses speech
         */
        onPause?: (event: SpeechSynthesisEvent) => void;
        /**
         * Callback when a text fragment is finished reading
         */
        onEnd?: (event: SpeechSynthesisEvent) => void;
    };

export const TextToSpeech = forwardRef<HTMLDivElement, Props>(
    (
        {
            children,
            className,
            language = 'en',
            playLabel = 'Read the text',
            pauseLabel = 'Pause reading',
            restartLabel = 'Restart reading',
            onSpeak = () => {},
            onPause = () => {},
            onEnd = () => {},
            ...nativeProps
        },
        ref
    ) => {
        const wrapperRef = useRef<HTMLDivElement>(null);

        const {speak, pause, isSpeaking, restart} = useSpeechSynth({
            language,
            ref: wrapperRef,
            onSpeak,
            onEnd,
            onPause,
        });

        const labelId = useId();

        const handleClick = useCallback(() => {
            !isSpeaking ? speak() : pause();
        }, [isSpeaking, pause, speak]);

        const Icon = isSpeaking ? IconPause : IconPlay;

        return (
            <div {...nativeProps} className={classNames(classes.wrapper, className)} ref={ref}>
                <div className={classNames(classes.controls, {[classes.speaking]: isSpeaking})}>
                    <button
                        onClick={handleClick}
                        className={classes.button}
                        aria-describedby={labelId}>
                        <Icon className={classes.icon} />
                    </button>
                    <div className={classes.label} id={labelId}>
                        {!isSpeaking ? playLabel : pauseLabel}
                    </div>
                    {isSpeaking && (
                        <button
                            aria-description={restartLabel}
                            onClick={restart}
                            className={classNames(classes.button, classes.restart)}>
                            <IconRepeat className={classes.icon} />
                        </button>
                    )}
                </div>
                <div ref={wrapperRef}>{children}</div>
            </div>
        );
    }
);

TextToSpeech.displayName = 'TextToSpeech';
