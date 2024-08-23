import type {Dispatch, FormEvent, SetStateAction} from 'react';
import {useCallback, useState} from 'react';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

import type {ValidationProps, ValidatorFn} from './ValidationProps.ts';
import {ValidationState} from './ValidationProps.ts';
import {defaultValidator} from './defaultValidator.ts';
import {useHandleFormReset} from './useHandleFormReset.ts';
import {getFormState} from './getFormState.ts';

type InputMode = 'interactive' | 'textual';

const getValue = <TEvent extends FormEvent, TElement extends HTMLInputElement>(
    event: TEvent,
    mode: InputMode
) => {
    return mode === 'interactive'
        ? (event.target as TElement).checked
        : (event.target as TElement).value;
};

const useValidatorFn = <TEvent extends FormEvent, TElement extends HTMLInputElement>({
    validatorFn,
    reportValidity,
    setValidity,
}: {
    validatorFn: ValidatorFn;
    reportValidity: (event: TEvent) => void;
    setValidity: Dispatch<SetStateAction<keyof typeof ValidationState>>;
}) => {
    const createValidatorSync = useCallback(
        (mode: InputMode, event: TEvent) => {
            const value = getValue(event, mode);
            const formState = getFormState((event.target as TElement)!.form);
            const validationError = validatorFn?.(
                value,
                (event.target as TElement).validity,
                formState
            );
            (event.target as TElement).setCustomValidity(validationError as string);
            reportValidity(event);
        },
        [validatorFn, reportValidity]
    );

    const createValidatorExternal = useCallback(() => {}, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedValidator = useCallback(AwesomeDebouncePromise(validatorFn!, 1000), [
        validatorFn,
    ]);

    const createValidatorAsync = useCallback(
        async (mode: InputMode, event: TEvent) => {
            (event.target as TElement).setCustomValidity('');
            const value = getValue(event, mode);
            const formState = getFormState((event.target as TElement)!.form);
            setValidity(ValidationState.inProgress);
            let validationError = '';
            try {
                validationError = await debouncedValidator(
                    value,
                    (event.target as TElement).validity,
                    formState
                );
            } catch (error) {
                (event.target as TElement).setCustomValidity(error as string);
            }
            (event.target as TElement).setCustomValidity(validationError);
            reportValidity(event);
        },
        [setValidity, debouncedValidator, reportValidity]
    );

    return {createValidatorSync, createValidatorAsync, createValidatorExternal};
};

const createValidatorFn = (validation: ValidationProps['validation']): ValidatorFn => {
    if (typeof validation === 'function') {
        return validation;
    }
    return defaultValidator;
};

enum Modes {
    async = 'async',
    external = 'external',
    sync = 'sync',
}

const getMode = (validation: ValidationProps['validation']) => {
    if (validation?.constructor.name === 'AsyncFunction') {
        return Modes.async;
    } else if (typeof validation === 'string') {
        return Modes.external;
    }

    return Modes.sync;
};

export const useValidation = <TEvent extends FormEvent, TElement extends HTMLInputElement>({
    validation,
    hasValidators,
}: ValidationProps & {hasValidators: boolean}) => {
    const validatorFn = createValidatorFn(validation);
    const mode = getMode(validation);

    const [validity, setValidity] = useState<keyof typeof ValidationState>(
        ValidationState.pristine
    );

    useHandleFormReset(setValidity);

    const reportValidity = useCallback(
        (event: TEvent) => {
            const isValid = (event.target as TElement).reportValidity();
            const ValidState = hasValidators ? ValidationState.valid : ValidationState.pristine;
            const nextValidationState = isValid ? ValidState : ValidationState.error;
            /**
             * Change state only when input has validators or is in the error state.
             * This is required to avoid always showing a green checkmark for input without validation.
             */
            (hasValidators || validity === ValidationState.error) &&
                setValidity(nextValidationState);
        },
        [hasValidators, validity]
    );

    const {createValidatorAsync, createValidatorSync, createValidatorExternal} = useValidatorFn({
        validatorFn,
        reportValidity,
        setValidity,
    });

    const validateInteractive = useCallback(
        (event: TEvent) => {
            switch (mode) {
                case 'sync': {
                    return createValidatorSync('interactive', event);
                }
                case 'async': {
                    return createValidatorAsync('interactive', event);
                }
                case 'external': {
                    return createValidatorExternal();
                }
            }
        },
        [createValidatorAsync, createValidatorExternal, createValidatorSync, mode]
    );

    const validateTextual = useCallback(
        (event: TEvent) => {
            switch (mode) {
                case 'sync': {
                    return createValidatorSync('textual', event);
                }
                case 'async': {
                    return createValidatorAsync('textual', event);
                }
                case 'external': {
                    return createValidatorExternal();
                }
            }
        },
        [mode, createValidatorSync, createValidatorAsync, createValidatorExternal]
    );

    return {validateInteractive, validateTextual, validity, setValidity};
};
