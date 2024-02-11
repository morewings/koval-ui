import {useContext, createContext} from 'react';

import type {DialogAction, DialogState} from './DialogReducer';
import {initialState} from './DialogReducer';

export type DialogContextType = {dispatch: (action: DialogAction) => void; state: DialogState};

export const DialogContext = createContext<DialogContextType>({
    state: initialState,
    dispatch: () => {},
});

export const useDialogContext = () => useContext(DialogContext);
