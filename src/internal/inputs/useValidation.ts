import type {Dispatch, SetStateAction, ChangeEvent} from 'react';
import {useCallback, useState} from 'react';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

import type {ValidationProps} from './ValidationProps.ts';
import {ValidationState} from './ValidationProps.ts';
import {defaultValidator} from './defaultValidator.ts';

type Props = {
    validatorFn: ValidationProps['validatorFn'];
    setValidity: Dispatch<SetStateAction<keyof typeof ValidationState | null>>;
};

type InputMode = 'interactive' | 'textual';

const getValue = (event: ChangeEvent<HTMLInputElement>, mode: InputMode) => {
    return mode === 'interactive' ? event.target.checked : event.target.value;
};

export const useValidation = ({validatorFn, setValidity}: Props) => {
    const hasCustomValidation = validatorFn !== defaultValidator;
    const [customValidation, setCustomValidation] = useState(hasCustomValidation);

    const isAsync = validatorFn?.constructor.name === 'AsyncFunction';

    const reportValidity = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const isValid = event.target.reportValidity();
            if (!isValid && !customValidation) {
                setCustomValidation(true);
            }
            const validState = customValidation ? ValidationState.valid : null;
            const nextValidationState = isValid ? validState : ValidationState.error;
            setValidity(nextValidationState);
        },
        [customValidation, setValidity]
    );

    const createValidatorSync = useCallback(
        (mode: InputMode, event: ChangeEvent<HTMLInputElement>) => {
            const value = getValue(event, mode);
            const validationError = validatorFn?.(value);
            event.target.setCustomValidity(validationError as string);
            reportValidity(event);
        },
        [validatorFn, reportValidity]
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedValidator = useCallback(AwesomeDebouncePromise(validatorFn!, 1000), [validatorFn]);

    const createValidatorAsync = useCallback(
        async (mode: InputMode, event: ChangeEvent<HTMLInputElement>) => {
            event.target.setCustomValidity('');
            const value = getValue(event, mode);
            setValidity(ValidationState.inProgress);
            let validationError = '';
            try {
                validationError = await debouncedValidator(value);
            } catch (error) {
                event.target.setCustomValidity(error as string);
            }
            event.target.setCustomValidity(validationError);
            reportValidity(event);
        },
        [setValidity, debouncedValidator, reportValidity]
    );

    const validateInteractive = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            return isAsync ? createValidatorAsync('interactive', event) : createValidatorSync('interactive', event);
        },
        [createValidatorAsync, createValidatorSync, isAsync]
    );

    const validateTextual = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            return isAsync ? createValidatorAsync('textual', event) : createValidatorSync('textual', event);
        },
        [createValidatorSync, isAsync, createValidatorAsync]
    );

    return {validateInteractive, validateTextual};
};
