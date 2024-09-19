import {
    timeout,
    validatorAsync,
    validatorAsyncBoolean,
    validatorSync,
    validatorSyncBoolean,
} from './../validatorMocks.ts';
import {ValidationState} from './../ValidationProps.ts';

export const validationControl = {
    options: [
        'noValidator',
        'syncValidator',
        'asyncValidator',
        'error',
        'valid',
        'inProgress',
        'pristine',
    ],
    mapping: {
        noValidator: undefined,
        syncValidator: validatorSync,
        asyncValidator: validatorAsync,
        error: ValidationState.error,
        valid: ValidationState.valid,
        inProgress: ValidationState.inProgress,
        pristine: ValidationState.pristine,
    },
    control: {
        type: 'radio',
        labels: {
            noValidator: 'No custom validator',
            syncValidator: 'Sync validator (value.length < 4)',
            asyncValidator: 'Async validator (value.length < 4)',
            error: 'External validation: "error"',
            valid: 'External validation: "valid"',
            inProgress: 'External validation: "inProgress"',
            pristine: 'External validation: "pristine"',
        },
    },
};

export const validationControlBoolean = {
    options: [
        'noValidator',
        'syncValidator',
        'asyncValidator',
        'error',
        'valid',
        'inProgress',
        'pristine',
    ], // An array of serializable values
    mapping: {
        noValidator: undefined,
        syncValidator: validatorSyncBoolean,
        asyncValidator: validatorAsyncBoolean,
        error: ValidationState.error,
        valid: ValidationState.valid,
        inProgress: ValidationState.inProgress,
        pristine: ValidationState.pristine,
    }, // Maps serializable option values to complex arg values
    control: {
        type: 'radio', // Type 'select' is automatically inferred when 'options' is defined
        labels: {
            // 'labels' maps option values to string labels
            noValidator: 'No custom validator',
            syncValidator: 'Sync validator (value !== true)',
            asyncValidator: 'Async validator (value !== true)',
            error: 'External validation: "error"',
            valid: 'External validation: "valid"',
            inProgress: 'External validation: "inProgress"',
            pristine: 'External validation: "pristine"',
        },
    },
};

export const validationControlNumber = {
    options: [
        'noValidator',
        'syncValidator',
        'asyncValidator',
        'error',
        'valid',
        'inProgress',
        'pristine',
    ],
    mapping: {
        noValidator: undefined,
        syncValidator: (value?: number) => {
            console.log('Value captured:', value);
            if (value && value > 3) {
                return 'Too big';
            } else {
                return '';
            }
        },
        asyncValidator: async (value?: number) => {
            console.log('Value captured:', value);
            await timeout(1000);
            if (value && value > 3) {
                return `Last captured: ${value}`;
            } else {
                return '';
            }
        },
        error: ValidationState.error,
        valid: ValidationState.valid,
        inProgress: ValidationState.inProgress,
        pristine: ValidationState.pristine,
    },
    control: {
        type: 'radio',
        labels: {
            noValidator: 'No custom validator',
            syncValidator: 'Sync validator (value < 4)',
            asyncValidator: 'Async validator (value < 4)',
            error: 'External validation: "error"',
            valid: 'External validation: "valid"',
            inProgress: 'External validation: "inProgress"',
            pristine: 'External validation: "pristine"',
        },
    },
};

export const validationControlDate = {
    options: [
        'noValidator',
        'syncValidator',
        'asyncValidator',
        'error',
        'valid',
        'inProgress',
        'pristine',
    ],
    mapping: {
        noValidator: undefined,
        syncValidator: (value?: unknown) => {
            console.log('Value captured:', value);
            if (value && value.toString().includes('2018-07-23')) {
                return '';
            } else {
                return 'Should be 2018-07-23';
            }
        },
        asyncValidator: async (value?: unknown) => {
            console.log('Value captured:', value);
            await timeout(5000);
            if (value && value.toString().includes('2018-07-23')) {
                return '';
            } else {
                return `Last captured: ${value}`;
            }
        },
        error: ValidationState.error,
        valid: ValidationState.valid,
        inProgress: ValidationState.inProgress,
        pristine: ValidationState.pristine,
    },
    control: {
        type: 'radio',
        labels: {
            noValidator: 'No custom validator',
            syncValidator: 'Sync validator (2018-07-23)',
            asyncValidator: 'Async validator (2018-07-23)',
            error: 'External validation: "error"',
            valid: 'External validation: "valid"',
            inProgress: 'External validation: "inProgress"',
            pristine: 'External validation: "pristine"',
        },
    },
};
