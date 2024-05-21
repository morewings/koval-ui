import {useContext, createContext} from 'react';

import type {NotificationAction, NotificationState} from './NotificationReducer.ts';
import {initialState} from './NotificationReducer.ts';

export type DialogContextType = {
    dispatch: (action: NotificationAction) => void;
    state: NotificationState;
};

export const NotificationContext = createContext<DialogContextType>({
    state: initialState,
    dispatch: () => {},
});

export const useNotificationContext = () => useContext(NotificationContext);
