import type {ValidationProps} from './ValidationProps.ts';

export const defaultValidator: ValidationProps['validatorFn'] = (_: unknown | undefined) => '';
