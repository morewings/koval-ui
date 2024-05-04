import type {Dispatch} from 'react';
import {useEffect} from 'react';

import {useFormSelectors} from '@/lib/Form';

import type {ValidationState} from './ValidationProps.ts';

export const useHandleFormReset = (setValidity: Dispatch<ValidationState | null>) => {
    const {pristine} = useFormSelectors();
    useEffect(() => {
        pristine && setValidity(null);
    }, [pristine, setValidity]);
};
