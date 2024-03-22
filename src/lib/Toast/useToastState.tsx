import {useCallback} from 'react';

import {useToastContext} from './ToastContext.ts';
import type {ToastState} from './ToastReducer.ts';
import {Actions} from './ToastReducer.ts';

const useSelector = (callback: (arg0: ToastState) => string | undefined) => {
    const {state} = useToastContext();
    return callback(state);
};

export const useToastState = (id: string) => {
    const {dispatch} = useToastContext();
    const openToast = useCallback(() => {
        dispatch({
            type: Actions.TOAST_OPEN,
            id,
        });
    }, [id, dispatch]);
    const closeToast = useCallback(() => {
        dispatch({
            type: Actions.TOAST_CLOSE,
            id,
        });
    }, [id, dispatch]);
    const openToastId = useSelector((state: ToastState) => state.open);
    const isOpen = id === openToastId;
    return {
        openToast,
        closeToast,
        isOpen,
    };
};
