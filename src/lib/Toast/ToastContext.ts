import {useContext, createContext} from 'react';

import type {ToastAction, ToastState} from './ToastReducer.ts';
import {initialState} from './ToastReducer.ts';

export type DialogContextType = {dispatch: (action: ToastAction) => void; state: ToastState};

export const ToastContext = createContext<DialogContextType>({
    state: initialState,
    dispatch: () => {},
});

export const useToastContext = () => useContext(ToastContext);
