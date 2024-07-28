import type {Dispatch, SetStateAction, MutableRefObject} from 'react';
import {useEffect} from 'react';

import type {ValidationProps} from '@/internal/inputs';
import {ValidationState} from '@/internal/inputs';

export type Props = {
    validation?: ValidationProps['validation'];
    setValidity: Dispatch<SetStateAction<keyof typeof ValidationState>>;
    inputRef: MutableRefObject<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null>;
    errorMessage?: string;
};

/**
 * React hook designed to contain effects which synchronize input validation
 * with external validation state via prop or context (TODO).
 * @see ValidationState
 */
export const useExternalValidation = ({validation, inputRef, setValidity, errorMessage}: Props) => {
    useEffect(() => {
        if (typeof validation === 'string') {
            setValidity(validation);
            switch (validation) {
                case 'valid': {
                    inputRef.current?.setCustomValidity('');
                    break;
                }
                case 'error': {
                    inputRef.current?.setCustomValidity(errorMessage || ValidationState.error);
                    break;
                }
                case 'inProgress': {
                    inputRef.current?.setCustomValidity(errorMessage || ValidationState.inProgress);
                    break;
                }
                default: {
                    inputRef.current?.setCustomValidity('');
                }
            }
        }
    }, [errorMessage, inputRef, setValidity, validation]);
};
