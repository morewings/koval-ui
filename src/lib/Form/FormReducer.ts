/**
 * Action names collection
 * @example
 * import { Actions } from './FormReducer';
 * dispatch({ type: Actions.FORM_SET_PRISTINE})
 * */
export enum Actions {
    FORM_SET_PRISTINE = 'FORM_SET_PRISTINE',
}

/** Form state type */
export type FormState = {
    /** Defines if form is rendered or was reset to pristine state */
    pristine: boolean;
};

export const initialState = {
    pristine: true,
} as FormState;

export type FormAction = {
    /** Action name */
    type: Actions;
    pristine: boolean;
};

export const FormReducer = (state = initialState, action: FormAction): FormState => {
    switch (action.type) {
        case Actions.FORM_SET_PRISTINE: {
            return {
                ...state,
                pristine: action.pristine,
            };
        }
        default:
            return state;
    }
};
