import type {Dispatch} from 'react';
import {createContext} from 'react';

import type {FormState, FormAction} from './FormReducer.ts';
import {initialState} from './FormReducer.ts';

export const FormContext = createContext<{state: FormState; dispatch: Dispatch<FormAction>}>({
    state: initialState,
    dispatch: () => {},
});
