import type {MutableRefObject} from 'react';
import {useEffect} from 'react';

import {useInterval} from '@/internal/hooks/useInterval.ts';
import {useIsInViewport} from '@/internal/hooks/useIsInViewport.tsx';
import {useDocumentVisible} from '@/internal/hooks/useDocumentVisible.ts';

type Props = {
    rotateFn: () => void;
    rewindFn: () => void;
    interval?: number | null;
    ref: MutableRefObject<HTMLElement | null>;
};

export const useAutoRotate = ({rotateFn, interval = null, ref, rewindFn}: Props) => {
    const isInViewport = useIsInViewport(ref);
    const isActiveTab = useDocumentVisible();
    const isEnabled = Boolean(interval) && isInViewport && isActiveTab;
    useEffect(() => {
        !isActiveTab && rewindFn();
    }, [isActiveTab, rewindFn]);
    useInterval({callback: rotateFn, interval, condition: isEnabled});
};
