import {useState} from 'react';

import {useSafeLayoutEffect} from './useSafeLayoutEffect.ts';

export const useBrowserLocale = () => {
    const [locale, setLocale] = useState('en-US');
    useSafeLayoutEffect(() => {
        setLocale(navigator.language);
    }, []);

    return locale;
};
