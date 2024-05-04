import type {FormEvent} from 'react';
import {useCallback, useState} from 'react';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

import type {ValidationProps} from './ValidationProps.ts';
import {ValidationState} from './ValidationProps.ts';
import {defaultValidator} from './defaultValidator.ts';
import {useHandleFormReset} from './useHandleFormReset.ts';

type InputMode = 'interactive' | 'textual';

const getValue = <TEvent extends FormEvent, TElement extends HTMLInputElement>(event: TEvent, mode: InputMode) => {
    return mode === 'interactive' ? (event.target as TElement).checked : (event.target as TElement).value;
};

export const useValidation = <TEvent extends FormEvent, TElement extends HTMLInputElement>({
    validatorFn,
}: ValidationProps) => {
    const hasCustomValidation = validatorFn !== defaultValidator;
    const [customValidation, setCustomValidation] = useState(hasCustomValidation);

    const isAsync = validatorFn?.constructor.name === 'AsyncFunction';

    const [validity, setValidity] = useState<keyof typeof ValidationState | null>(null);

    useHandleFormReset(setValidity);

    const reportValidity = useCallback(
        (event: TEvent) => {
            const isValid = (event.target as TElement).reportValidity();
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
        (mode: InputMode, event: TEvent) => {
            const value = getValue(event, mode);
            const validationError = validatorFn?.(value, (event.target as TElement).validity);
            (event.target as TElement).setCustomValidity(validationError as string);
            reportValidity(event);
        },
        [validatorFn, reportValidity]
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedValidator = useCallback(AwesomeDebouncePromise(validatorFn!, 1000), [validatorFn]);

    const createValidatorAsync = useCallback(
        async (mode: InputMode, event: TEvent) => {
            (event.target as TElement).setCustomValidity('');
            const value = getValue(event, mode);
            setValidity(ValidationState.inProgress);
            let validationError = '';
            try {
                validationError = await debouncedValidator(value, (event.target as TElement).validity);
            } catch (error) {
                (event.target as TElement).setCustomValidity(error as string);
            }
            (event.target as TElement).setCustomValidity(validationError);
            reportValidity(event);
        },
        [setValidity, debouncedValidator, reportValidity]
    );

    const validateInteractive = useCallback(
        (event: TEvent) => {
            return isAsync ? createValidatorAsync('interactive', event) : createValidatorSync('interactive', event);
        },
        [createValidatorAsync, createValidatorSync, isAsync]
    );

    const validateTextual = useCallback(
        (event: TEvent) => {
            return isAsync ? createValidatorAsync('textual', event) : createValidatorSync('textual', event);
        },
        [createValidatorSync, isAsync, createValidatorAsync]
    );

    return {validateInteractive, validateTextual, validity, setValidity};
};
