/**
 * Action names collection
 * @example
 * import { Actions } from './ToastReducer';
 * dispatch({ type: Toast.TOAST_CLOSE})
 * dispatch({ type: Toast.TOAST_OPEN})
 * */
export enum Actions {
    TOAST_CLOSE = 'TOAST_CLOSE',
    TOAST_OPEN = 'TOAST_OPEN',
}

/** Toast ID type */
export type Id = string;

/** Toast state type */
export type ToastState = {
    /** List of open Toasts' IDs */
    open: Id;
};

export const initialState = {
    open: '',
} as ToastState;

export type ToastAction = {
    /** ID of target Toast */
    id: Id;
    /** Action name */
    type: Actions;
};

export const ToastReducer = (state = initialState, action: ToastAction): ToastState => {
    switch (action.type) {
        case Actions.TOAST_CLOSE: {
            const {id} = action;
            const nextOpen = state.open === id ? '' : state.open;
            return {
                ...state,
                open: nextOpen,
            };
        }
        case Actions.TOAST_OPEN: {
            const {id} = action;
            return {
                ...state,
                open: id,
            };
        }
        default:
            return state;
    }
};
