import type {JSX, ExoticComponent} from 'react';
import {useMemo, useReducer, forwardRef} from 'react';

import {FormReducer, initialState} from './FormReducer.ts';
import {FormContext} from './FormContext.tsx';

export const withFormProvider = <TProps extends JSX.IntrinsicAttributes>(
    Component: ExoticComponent<TProps>
) => {
    const {Provider} = FormContext;
    const FormProvider = forwardRef<HTMLFormElement, TProps>((props, ref) => {
        const [state, dispatch] = useReducer(FormReducer, initialState);
        const memoizedValue = useMemo(() => ({state, dispatch}), [state]);
        return (
            <Provider value={memoizedValue}>
                <Component {...(props as TProps)} ref={ref} />
            </Provider>
        );
    });
    FormProvider.displayName = 'FormProvider';
    return FormProvider;
};
