import type {Dispatch, SetStateAction, MutableRefObject} from 'react';
import {useEffect} from 'react';

import {ValidationState} from '@/internal/inputs';

export type Props = {
    validationState?: keyof typeof ValidationState;
    setValidity: Dispatch<SetStateAction<keyof typeof ValidationState | null>>;
    inputRef: MutableRefObject<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null>;
    errorMessage?: string;
};

/**
 * React hook designed to contain effects which synchronize input validation
 * with external validation state via prop or context (TODO).
 * NB! On change validation takes preference.
 * @see ValidationState
 */
export const useExternalValidation = ({
    validationState,
    inputRef,
    setValidity,
    errorMessage = ValidationState.error,
}: Props) => {
    useEffect(() => {
        // Empty string is considered to be positive validation result for HTMLInputElement.setCustomValidity
        const normalizedErrorMessage = errorMessage ? errorMessage : ValidationState.error;
        if (validationState === ValidationState.error && inputRef.current) {
            console.log('ValidationState.error', validationState, inputRef.current);
            inputRef.current.setCustomValidity(normalizedErrorMessage);
            setValidity(ValidationState.error);
        } else if (validationState && inputRef.current) {
            inputRef.current.setCustomValidity('');
            setValidity(validationState);
        }
    }, [errorMessage, inputRef, setValidity, validationState]);
};
