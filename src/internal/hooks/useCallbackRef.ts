import {useCallback, useRef} from 'react';

import {useSafeLayoutEffect} from './useSafeLayoutEffect.ts';

/**
 * React hook to persist any value between renders,
 * but keeps it up-to-date if it changes.
 *
 * @param fn the function to persist
 * @param deps the function dependency list
 */
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export function useCallbackRef<T extends (...args: any[]) => any>(
    fn: T | undefined,
    deps: React.DependencyList = []
): T {
    const ref = useRef(fn);

    useSafeLayoutEffect(() => {
        ref.current = fn;
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useCallback(((...args) => ref.current?.(...args)) as T, deps);
}
