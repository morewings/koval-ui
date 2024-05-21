import {useContext, createContext} from 'react';

import type {TemplateNameAction, TemplateNameState} from './TemplateNameReducer.ts';
import {initialState} from './TemplateNameReducer.ts';

export type DialogContextType = {
    dispatch: (action: TemplateNameAction) => void;
    state: TemplateNameState;
};

export const TemplateNameContext = createContext<DialogContextType>({
    state: initialState,
    dispatch: () => {},
});

export const useTemplateNameContext = () => useContext(TemplateNameContext);
