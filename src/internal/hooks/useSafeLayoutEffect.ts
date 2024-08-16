import {useEffect, useLayoutEffect} from 'react';

import {isBrowser} from '@/internal/utils/isBrowser.ts';

export const useSafeLayoutEffect = isBrowser() ? useLayoutEffect : useEffect;
