import type {ChangeEvent, FormEvent} from 'react';
import {useCallback, useState} from 'react';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

import type {ValidationProps} from './ValidationProps.ts';
import {ValidationState} from './ValidationProps.ts';
import {defaultValidator} from './defaultValidator.ts';

type InputMode = 'interactive' | 'textual';

/* TODO: fix all (event.target as HTMLInputElement) assignments */

const getValue = (event: FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>, mode: InputMode) => {
    return mode === 'interactive'
        ? (event.target as HTMLInputElement).checked
        : (event.target as HTMLInputElement | HTMLTextAreaElement).value;
};

export const useValidation = ({validatorFn}: ValidationProps) => {
    const hasCustomValidation = validatorFn !== defaultValidator;
    const [customValidation, setCustomValidation] = useState(hasCustomValidation);

    const isAsync = validatorFn?.constructor.name === 'AsyncFunction';

    const [validity, setValidity] = useState<keyof typeof ValidationState | null>(null);

    const reportValidity = useCallback(
        (event: FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>) => {
            const isValid = (event.target as HTMLInputElement | HTMLTextAreaElement).reportValidity();
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
        (mode: InputMode, event: FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>) => {
            const value = getValue(event, mode);
            const validationError = validatorFn?.(
                value,
                (event.target as HTMLInputElement | HTMLTextAreaElement).validity
            );
            (event.target as HTMLInputElement | HTMLTextAreaElement).setCustomValidity(validationError as string);
            reportValidity(event);
        },
        [validatorFn, reportValidity]
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedValidator = useCallback(AwesomeDebouncePromise(validatorFn!, 1000), [validatorFn]);

    const createValidatorAsync = useCallback(
        async (mode: InputMode, event: FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>) => {
            (event.target as HTMLInputElement | HTMLTextAreaElement).setCustomValidity('');
            const value = getValue(event, mode);
            setValidity(ValidationState.inProgress);
            let validationError = '';
            try {
                validationError = await debouncedValidator(
                    value,
                    (event.target as HTMLInputElement | HTMLTextAreaElement).validity
                );
            } catch (error) {
                (event.target as HTMLInputElement | HTMLTextAreaElement).setCustomValidity(error as string);
            }
            (event.target as HTMLInputElement | HTMLTextAreaElement).setCustomValidity(validationError);
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
        (event: FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>) => {
            /* TODO: check if this type can be fixed */
            return isAsync ? createValidatorAsync('textual', event) : createValidatorSync('textual', event);
        },
        [createValidatorSync, isAsync, createValidatorAsync]
    );

    return {validateInteractive, validateTextual, validity, setValidity};
};
