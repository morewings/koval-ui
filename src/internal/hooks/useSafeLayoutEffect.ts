import {useEffect, useLayoutEffect} from 'react';

export function isBrowser() {
    return Boolean(globalThis?.document);
}

export const useSafeLayoutEffect = isBrowser() ? useLayoutEffect : useEffect;
