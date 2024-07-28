import type {FormState} from './getFormState.ts';

export enum ValidationState {
    error = 'error',
    valid = 'valid',
    inProgress = 'inProgress',
    pristine = 'pristine',
}

export type ValidationConfig = {
    state: keyof typeof ValidationState;
    errorMessage?: string;
};

export type ValidatorFn = (
    value: unknown,
    validityState: ValidityState,
    formState: FormState
) => string | Promise<string>;

export type ValidationProps = {
    /** Enable to re-run validation when any field in the form changes */
    revalidateOnFormChange?: boolean;
    /**
     * Provide custom message for external validation errors. Applies only to errors reported by
     * validationState prop.
     * @see validationState
     */
    errorMessage?: string;
    /**
     * Set external validation state for input. Can be a string or a validator function
     * @see ValidationState
     * @see ValidatorFn
     * @see https://koval.support/inputs/input-validation
     */
    validation?: keyof typeof ValidationState | ValidatorFn;
};
