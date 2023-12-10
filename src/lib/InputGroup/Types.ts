import type {ChangeEvent, FC, ReactElement, FieldsetHTMLAttributes} from 'react';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import type {NativeProps} from '@/internal/inputs/interactiveAPI.ts';

export enum Validation {
    error = 'error',
    valid = 'valid',
    inProgress = 'inProgress',
}

export type Props = DataAttributes &
    LibraryProps &
    NativeProps & /*& CallbackProps*/ {
        type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url';
        prefix?: FC;
        validation?: keyof typeof Validation;
        validator?: (event: ChangeEvent<HTMLInputElement>) => void;
        label?: string;
        children: ReactElement<
            {name?: string; disabled?: FieldsetHTMLAttributes<HTMLFieldSetElement>['disabled']} & unknown
        >[];
        name: string;
        /**
         * Disable input.
         * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset
         */
        disabled?: FieldsetHTMLAttributes<HTMLFieldSetElement>['disabled'];
        hint?: string;
    };
