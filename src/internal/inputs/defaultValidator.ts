import type {ValidatorFn} from './ValidationProps.ts';

export const defaultValidator: ValidatorFn = (_: unknown | undefined) => '';
