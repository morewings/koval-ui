import type {MutableRefObject} from 'react';
import {useCallback, useEffect, useState, useRef} from 'react';

import type {LanguageCodes} from '@/internal/locale';

export type Props = {
    language: keyof typeof LanguageCodes;
    ref: MutableRefObject<HTMLDivElement | null>;
};

export const useSpeechSynth = ({language, ref}: Props) => {
    const [utterance, setUtterance] = useState<SpeechSynthesisUtterance>();

    const synth = useRef<SpeechSynthesis>();

    useEffect(() => {
        synth.current = window.speechSynthesis;
        return () => {
            synth.current?.cancel();
        };
    }, []);

    useEffect(() => {
        const nextUtterance = new SpeechSynthesisUtterance(ref.current?.innerText);
        nextUtterance.lang = language;
        nextUtterance.addEventListener('end', () => {
            setUtterance(nextUtterance);
            setSpeaking(false);
        });
        setUtterance(nextUtterance);
    }, [language, ref]);

    const [isSpeaking, setSpeaking] = useState(false);

    const speak = useCallback(() => {
        if (synth.current?.paused === true) {
            synth.current?.resume();
        } else {
            utterance && synth.current?.speak(utterance);
        }
        setSpeaking(true);
    }, [utterance]);

    const pause = useCallback(() => {
        synth.current?.pause();
        setSpeaking(false);
    }, []);

    return {speak, pause, isSpeaking};
};
