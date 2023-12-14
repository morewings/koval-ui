export enum ValidationState {
    error = 'error',
    valid = 'valid',
    inProgress = 'inProgress',
    submitting = 'submitting',
}

export type ValidationProps = {
    validatorFn?: (value: unknown) => string | Promise<string>;
    initialValidity?: keyof typeof ValidationState;
};
