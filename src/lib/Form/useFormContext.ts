import {useCallback, useContext} from 'react';

import {FormContext} from './FormContext.tsx';
import {Actions} from './FormReducer.ts';

export const useFormActions = () => {
    const {dispatch} = useContext(FormContext);
    const markAsPristine = useCallback(() => {
        dispatch({
            type: Actions.FORM_SET_PRISTINE,
            pristine: true,
        });
    }, [dispatch]);
    const markAsDirty = useCallback(() => {
        dispatch({
            type: Actions.FORM_SET_PRISTINE,
            pristine: false,
        });
    }, [dispatch]);

    return {
        markAsPristine,
        markAsDirty,
    };
};

export const useFormSelectors = () => {
    const {state} = useContext(FormContext);
    const pristine = state.pristine;

    return {
        pristine,
    };
};
