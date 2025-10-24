import type {MutableRefObject} from 'react';
import {useCallback, useEffect, useState, useRef} from 'react';

import type {LanguageCodes} from '@/internal/locale';

export type Props = {
    language: keyof typeof LanguageCodes;
    ref: MutableRefObject<HTMLDivElement | null>;
    onSpeak: (event: SpeechSynthesisEvent) => void;
    onPause: (event: SpeechSynthesisEvent) => void;
    onEnd: (event: SpeechSynthesisEvent) => void;
};

export const useSpeechSynth = ({language, ref, onEnd, onPause, onSpeak}: Props) => {
    const [utterance, setUtterance] = useState<SpeechSynthesisUtterance>();

    const synth = useRef<SpeechSynthesis>();

    useEffect(() => {
        synth.current = window.speechSynthesis;
        return () => {
            synth.current?.cancel();
        };
    }, []);

    const [isSpeaking, setSpeaking] = useState(false);

    useEffect(() => {
        const nextUtterance = new SpeechSynthesisUtterance(ref.current?.innerText);
        nextUtterance.lang = language;
        nextUtterance.addEventListener('end', event => {
            onEnd(event);
            setUtterance(nextUtterance);
            setSpeaking(false);
        });
        nextUtterance.addEventListener('resume', event => {
            onSpeak(event);
            setSpeaking(true);
        });
        nextUtterance.addEventListener('start', event => {
            onSpeak(event);
            setSpeaking(true);
        });
        nextUtterance.addEventListener('pause', event => {
            onPause(event);
            setSpeaking(false);
        });
        setUtterance(nextUtterance);
    }, [language, ref]);

    const speak = useCallback(() => {
        if (synth.current?.paused === true) {
            synth.current?.resume();
        } else {
            utterance && synth.current?.speak(utterance);
        }
    }, [utterance]);

    const restart = useCallback(() => {
        synth.current?.cancel();
        utterance && synth.current?.speak(utterance);
    }, [utterance]);

    const pause = useCallback(() => {
        synth.current?.pause();
    }, []);

    return {speak, pause, isSpeaking, restart};
};
