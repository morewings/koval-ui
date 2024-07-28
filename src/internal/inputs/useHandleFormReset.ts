import type {Dispatch} from 'react';
import {useEffect} from 'react';

import {useFormSelectors} from '@/lib/Form';

import {ValidationState} from './ValidationProps.ts';

export const useHandleFormReset = (setValidity: Dispatch<ValidationState>) => {
    const {pristine} = useFormSelectors();
    useEffect(() => {
        pristine && setValidity(ValidationState.pristine);
    }, [pristine, setValidity]);
};
