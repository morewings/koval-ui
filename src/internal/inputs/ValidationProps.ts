import type {FormState} from './getFormState.ts';

export enum ValidationState {
    error = 'error',
    valid = 'valid',
    inProgress = 'inProgress',
}

export type ValidationProps = {
    validatorFn?: (value: unknown, validityState: ValidityState, formState: FormState) => string | Promise<string>;
};
