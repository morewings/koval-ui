import {useContext, createContext} from 'react';

import type {DrawerAction, DrawerState} from './DrawerReducer.ts';
import {initialState} from './DrawerReducer.ts';

export type DialogContextType = {dispatch: (action: DrawerAction) => void; state: DrawerState};

export const DrawerContext = createContext<DialogContextType>({
    state: initialState,
    dispatch: () => {},
});

export const useDrawerContext = () => useContext(DrawerContext);
