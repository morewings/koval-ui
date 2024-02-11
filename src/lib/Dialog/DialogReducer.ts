// import {without} from 'lodash/fp';

/**
 * Action names collection
 * @example
 * import { Actions } from './DialogReducer';
 * dispatch({ type: Actions.DIALOG_CLOSE})
 * dispatch({ type: Actions.DIALOG_OPEN})
 * */
export enum Actions {
    DIALOG_CLOSE = 'DIALOG_CLOSE',
    DIALOG_OPEN = 'DIALOG_OPEN',
}

/** Dialog ID type */
export type Id = string;

/** Dialog state type */
export type DialogState = {
    /** List of open modals' IDs */
    open: Id[];
};

export const initialState = {
    open: [],
} as DialogState;

export type DialogAction = {
    /** ID of target Dialog */
    id: Id;
    /** Action name */
    type: Actions;
};

const without = <TValue>(value: TValue, array: TValue[]) => {
    return array.filter(member => member !== value);
};

export const DialogReducer = (state = initialState, action: DialogAction): DialogState => {
    switch (action.type) {
        case Actions.DIALOG_CLOSE: {
            const {id} = action;
            const nextOpen = without(id, state.open);
            return {
                ...state,
                open: nextOpen,
            };
        }
        case Actions.DIALOG_OPEN: {
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
