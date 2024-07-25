import type {Dispatch, SetStateAction, MutableRefObject} from 'react';
import {useEffect} from 'react';

import {ValidationState} from '@/internal/inputs';

export type Props = {
    validationState?: keyof typeof ValidationState;
    setValidity: Dispatch<SetStateAction<keyof typeof ValidationState | null>>;
    inputRef: MutableRefObject<HTMLInputElement | HTMLTextAreaElement | null>;
};

/**
 * React hook designed to contain effects which synchronize input validation
 * with external validation state via prop or context (TODO).
 * NB! On change validation takes preference.
 * @see ValidationState
 */
export const useSyncValidation = ({validationState, inputRef, setValidity}: Props) => {
    useEffect(() => {
        if (validationState === ValidationState.error && inputRef.current) {
            inputRef.current.setCustomValidity(ValidationState.error);
            setValidity(ValidationState.error);
        } else if (validationState && inputRef.current) {
            inputRef.current.setCustomValidity('');
            setValidity(validationState);
        }
    }, [inputRef, setValidity, validationState]);
};
