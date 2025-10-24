import type {ReactNode} from 'react';
import {useCallback, useId, forwardRef, useRef} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import type {LanguageCodes} from '@/internal/locale';
import {IconPlayPause} from '@/internal/Icons';
import {NumberUnit} from '@/lib/Number';

import classes from './TextToSpeech.module.css';
import {useSpeechSynth} from './useSpeechSynth.ts';
import {useTextLength} from './useTextLength.ts';

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
         * Enable byte counter on the right side
         */
        showCounter?: boolean;
    };

export const TextToSpeech = forwardRef<HTMLDivElement, Props>(
    (
        {
            children,
            className,
            language = 'en',
            playLabel = 'Read the text',
            pauseLabel = 'Pause reading',
            showCounter = true,
            ...nativeProps
        },
        ref
    ) => {
        const wrapperRef = useRef<HTMLDivElement>(null);

        const {speak, pause, isSpeaking} = useSpeechSynth({language, ref: wrapperRef});

        const length = useTextLength(wrapperRef);

        const labelId = useId();

        const handleClick = useCallback(() => {
            !isSpeaking ? speak() : pause();
        }, [isSpeaking, pause, speak]);

        return (
            <div {...nativeProps} className={classNames(classes.wrapper, className)} ref={ref}>
                <div className={classNames(classes.controls, {[classes.speaking]: isSpeaking})}>
                    <button
                        onClick={handleClick}
                        className={classes.button}
                        aria-describedby={labelId}>
                        <IconPlayPause className={classes.icon} />
                    </button>
                    <div className={classes.label} id={labelId}>
                        {!isSpeaking ? playLabel : pauseLabel}
                    </div>
                    {showCounter && (
                        <div className={classes.size}>
                            <NumberUnit value={length} unit="byte" locale={language} />
                        </div>
                    )}
                </div>
                <div ref={wrapperRef}>{children}</div>
            </div>
        );
    }
);

TextToSpeech.displayName = 'TextToSpeech';
