import type {ChangeEvent, FC} from 'react';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import type {CallbackProps, NativeProps} from '@/internal/inputs/API.ts';

export enum Validation {
    error = 'error',
    valid = 'valid',
    inProgress = 'inProgress',
}

export type Props = DataAttributes &
    LibraryProps &
    NativeProps &
    CallbackProps & {
        type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url';
        prefix?: FC;
        validation?: keyof typeof Validation;
        validator?: (event: ChangeEvent<HTMLInputElement>) => void;
    };
