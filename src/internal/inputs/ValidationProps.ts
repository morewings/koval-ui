export enum ValidationState {
    error = 'error',
    valid = 'valid',
    inProgress = 'inProgress',
}

export type ValidationProps = {
    validatorFn?: (value: unknown, validityState: ValidityState) => string | Promise<string>;
};
