import {createStoreProvider} from '@/internal/store/createStoreProvider.tsx';

import type {DrawerState, DrawerAction} from './DrawerReducer.ts';
import {initialState, DrawerReducer} from './DrawerReducer.ts';
import {DrawerContext} from './DrawerContext.ts';

export const DrawerProvider = createStoreProvider<DrawerState, DrawerAction>({
    context: DrawerContext,
    reducer: DrawerReducer,
    initialState,
});
