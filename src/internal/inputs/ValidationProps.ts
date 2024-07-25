import type {FormState} from './getFormState.ts';

export enum ValidationState {
    error = 'error',
    valid = 'valid',
    inProgress = 'inProgress',
}

export type ValidationProps = {
    /** Enable to re-run validation when any field in the form changes */
    revalidateOnFormChange?: boolean;
    /**
     * Provide callback function to validate input.
     * @see https://koval.support/inputs/input-validation
     */
    validatorFn?: (
        value: unknown,
        validityState: ValidityState,
        formState: FormState
    ) => string | Promise<string>;
    /**
     * Set external validation state for input. NB! On change validation takes preference over this.
     * @see ValidationState
     */
    validationState?: keyof typeof ValidationState;
};
