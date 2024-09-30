import {useSupports} from './useSupports.ts';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
enum BrowserTypes {
    Firefox = 'Firefox',
    Chromium = 'Chromium',
    Safari = 'Safari',
}

export const useDetectBrowser = () => {
    const isFirefox = useSupports('-moz-appearance:none');
    const isChrome = useSupports(
        'not (-webkit-hyphens:none)) and (not (-moz-appearance:none)) and (list-style-type:"*"'
    );
    const isSafari = useSupports('-webkit-hyphens:none');

    return [
        {browser: 'Firefox', condition: isFirefox},
        {browser: 'Chromium', condition: isChrome},
        {browser: 'Safari', condition: isSafari},
    ].find(({condition}) => condition)?.browser as keyof typeof BrowserTypes | undefined;
};
