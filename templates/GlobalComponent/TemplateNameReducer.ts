/**
 * Action names collection
 * @example
 * import { Actions } from './TemplateNameReducer';
 * dispatch({ type: TemplateName.TEMPLATE_NAME_CLOSE})
 * dispatch({ type: TemplateName.TEMPLATE_NAME_OPEN})
 * */
export enum Actions {
    TEMPLATE_NAME_CLOSE = 'TEMPLATE_NAME_CLOSE',
    TEMPLATE_NAME_OPEN = 'TEMPLATE_NAME_OPEN',
}

/** TemplateName ID type */
export type Id = string;

/** TemplateName state type */
export type TemplateNameState = {
    /** List of open TemplateName IDs */
    open: Id[];
};

export const initialState = {
    open: [],
} as TemplateNameState;

export type TemplateNameAction = {
    /** ID of target TemplateName */
    id: Id;
    /** Action name */
    type: Actions;
};

const without = <TValue>(value: TValue, array: TValue[]) => {
    return array.filter(member => member !== value);
};

export const TemplateNameReducer = (state = initialState, action: TemplateNameAction): TemplateNameState => {
    switch (action.type) {
        case Actions.TEMPLATE_NAME_CLOSE: {
            const {id} = action;
            const nextOpen = without(id, state.open);
            return {
                ...state,
                open: nextOpen,
            };
        }
        case Actions.TEMPLATE_NAME_OPEN: {
            const {id} = action;
            return {
                ...state,
                open: [...state.open, id],
            };
        }
        default:
            return state;
    }
};
