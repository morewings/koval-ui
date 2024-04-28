/**
 * Action names collection
 * @example
 * import { Actions } from './DrawerReducer';
 * dispatch({ type: Drawer.DRAWER_CLOSE})
 * dispatch({ type: Drawer.DRAWER_OPEN})
 * */
export enum Actions {
    DRAWER_CLOSE = 'DRAWER_CLOSE',
    DRAWER_OPEN = 'DRAWER_OPEN',
}

/** Drawer ID type */
export type Id = string;

/** Drawer state type */
export type DrawerState = {
    /** List of open Drawer IDs */
    open?: Id;
};

export const initialState = {
    open: undefined,
} as DrawerState;

export type DrawerAction = {
    /** ID of target Drawer */
    id: Id;
    /** Action name */
    type: Actions;
};

export const DrawerReducer = (state = initialState, action: DrawerAction): DrawerState => {
    switch (action.type) {
        case Actions.DRAWER_CLOSE: {
            const {id} = action;
            const nextOpen = id === state.open ? undefined : state.open;
            return {
                ...state,
                open: nextOpen,
            };
        }
        case Actions.DRAWER_OPEN: {
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
