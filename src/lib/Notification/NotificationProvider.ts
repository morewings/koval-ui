import {createStoreProvider} from '@/internal/store/createStoreProvider.tsx';

import type {NotificationState, NotificationAction} from './NotificationReducer.ts';
import {initialState, NotificationReducer} from './NotificationReducer.ts';
import {NotificationContext} from './NotificationContext.ts';

export const NotificationProvider = createStoreProvider<NotificationState, NotificationAction>({
    context: NotificationContext,
    reducer: NotificationReducer,
    initialState,
});
