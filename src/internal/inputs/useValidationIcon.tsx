import {Fragment} from 'react';

import {IconError, IconLoader, IconValid} from '@/internal/Icons';

import {ValidationState} from './ValidationProps.ts';

export const useValidationIcon = (validity: keyof typeof ValidationState) => {
    return {
        [ValidationState.error]: IconError,
        [ValidationState.valid]: IconValid,
        [ValidationState.inProgress]: IconLoader,
        [ValidationState.pristine]: () => <Fragment />,
    }[validity!];
};
