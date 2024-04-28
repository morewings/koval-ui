import {useCallback} from 'react';

import {useDrawerContext} from './DrawerContext.ts';
import type {DrawerState} from './DrawerReducer.ts';
import {Actions} from './DrawerReducer.ts';

const useSelector = (callback: (arg0: DrawerState) => string | undefined) => {
    const {state} = useDrawerContext();
    return callback(state);
};

export const useDrawerState = (id: string) => {
    const {dispatch} = useDrawerContext();
    const openDrawer = useCallback(() => {
        dispatch({
            type: Actions.DRAWER_OPEN,
            id,
        });
    }, [id, dispatch]);
    const closeDrawer = useCallback(() => {
        dispatch({
            type: Actions.DRAWER_CLOSE,
            id,
        });
    }, [id, dispatch]);
    const topDrawerId = useSelector((state: DrawerState) => state.open);
    const isOpen = id === topDrawerId;
    return {
        openDrawer,
        closeDrawer,
        isOpen,
    };
};
