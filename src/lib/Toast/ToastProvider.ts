import {createStoreProvider} from '@/internal/store/createStoreProvider.tsx';

import type {ToastState, ToastAction} from './ToastReducer.ts';
import {initialState, ToastReducer} from './ToastReducer.ts';
import {ToastContext} from './ToastContext.ts';

export const ToastProvider = createStoreProvider<ToastState, ToastAction>({
    context: ToastContext,
    reducer: ToastReducer,
    initialState,
});
