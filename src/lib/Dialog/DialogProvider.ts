import {createStoreProvider} from '@/internal/store/createStoreProvider.tsx';

import type {DialogState, DialogAction} from './DialogReducer';
import {initialState, DialogReducer} from './DialogReducer';
import {DialogContext} from './DialogContext';

export const DialogProvider = createStoreProvider<DialogState, DialogAction>({
    context: DialogContext,
    reducer: DialogReducer,
    initialState,
});
