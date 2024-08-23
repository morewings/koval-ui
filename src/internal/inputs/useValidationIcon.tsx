import {Fragment} from 'react';

import {IconErrorOutline, IconLoader, IconValid} from '@/internal/Icons';

import {ValidationState} from './ValidationProps.ts';

export const useValidationIcon = (validity: keyof typeof ValidationState) => {
    return {
        [ValidationState.error]: IconErrorOutline,
        [ValidationState.valid]: IconValid,
        [ValidationState.inProgress]: IconLoader,
        [ValidationState.pristine]: () => <Fragment />,
    }[validity!];
};
