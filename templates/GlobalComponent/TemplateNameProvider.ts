import {createStoreProvider} from '@/internal/store/createStoreProvider.tsx';

import type {TemplateNameState, TemplateNameAction} from './TemplateNameReducer.ts';
import {initialState, TemplateNameReducer} from './TemplateNameReducer.ts';
import {TemplateNameContext} from './TemplateNameContext.ts';

export const TemplateNameProvider = createStoreProvider<TemplateNameState, TemplateNameAction>({
    context: TemplateNameContext,
    reducer: TemplateNameReducer,
    initialState,
});
