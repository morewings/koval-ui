import {useCallback} from 'react';

import {last} from '@/internal/utils/last.ts';

import {useDialogContext} from './DialogContext';
import type {DialogState} from './DialogReducer';
import {Actions} from './DialogReducer';

const useSelector = (callback: (arg0: DialogState) => string | undefined) => {
    const {state} = useDialogContext();
    return callback(state);
};

export const useDialogState = (id: string) => {
    const {dispatch} = useDialogContext();
    const openDialog = useCallback(() => {
        dispatch({
            type: Actions.DIALOG_OPEN,
            id,
        });
    }, [id, dispatch]);
    const closeDialog = useCallback(() => {
        dispatch({
            type: Actions.DIALOG_CLOSE,
            id,
        });
    }, [id, dispatch]);
    const topDialogId = useSelector((state: DialogState) => last(state.open));
    const isOpen = id === topDialogId;
    return {
        openDialog,
        closeDialog,
        isOpen,
    };
};
