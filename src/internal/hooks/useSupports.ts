import {useState} from 'react';

import {useSafeLayoutEffect} from './useSafeLayoutEffect.ts';

export const useSupports = (supportCondition: string) => {
    const [result, setResult] = useState<boolean | undefined>();

    useSafeLayoutEffect(() => {
        setResult(CSS.supports(supportCondition));
    }, [supportCondition]);

    return result;
};
