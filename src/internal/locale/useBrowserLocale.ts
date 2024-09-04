import {useState} from 'react';

import {useSafeLayoutEffect} from '@/internal/hooks/useSafeLayoutEffect.ts';

/**
 * Utility hook. Returns browser locale. Updates when it changes.
 */
export const useBrowserLocale = () => {
    const [locale, setLocale] = useState('en-US');
    useSafeLayoutEffect(() => {
        setLocale(navigator.language);
    }, []);

    return locale;
};
