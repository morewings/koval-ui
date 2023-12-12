import type {Dispatch, SetStateAction, ChangeEvent} from 'react';
import {useCallback, useState} from 'react';

import {Validation} from '@/internal/inputs/Validation.ts';

import {defaultValidator} from './defaultValidator.ts';
// import type {CallbackPropsInteractive, CallbackPropsTextual} from './CallbackProps.ts';

type Props = {
    validatorFn: (value: unknown) => string;
    setValidity: Dispatch<SetStateAction<keyof typeof Validation | null>>;
};

type InputMode = 'interactive' | 'textual';

const getValue = (event: ChangeEvent<HTMLInputElement>, mode: InputMode) => {
    return mode === 'interactive' ? event.target.checked : event.target.value;
};

export const useValidation = ({validatorFn, setValidity}: Props) => {
    const hasCustomValidation = validatorFn !== defaultValidator;
    const [customValidation, setCustomValidation] = useState(hasCustomValidation);

    const createValidator = useCallback(
        (mode: InputMode, event: ChangeEvent<HTMLInputElement>) => {
            const value = getValue(event, mode);
            const validationError = validatorFn(value);
            if (validationError) {
                event.target.setCustomValidity(validationError);
            } else {
                event.target.setCustomValidity('');
            }

            const isValid = event.target.reportValidity();
            if (!isValid && !customValidation) {
                setCustomValidation(true);
            }
            const validState = customValidation ? Validation.valid : null;
            const nextValidationState = isValid ? validState : Validation.error;
            setValidity(nextValidationState);
        },
        [setValidity, customValidation, setCustomValidation, validatorFn]
    );

    const validateInputInteractive = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => createValidator('interactive', event),
        [createValidator]
    );

    const validateInputTextual = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => createValidator('textual', event),
        [createValidator]
    );

    return {validateInputInteractive, validateInputTextual};
};
