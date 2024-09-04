import {useCallback} from 'react';

import {last} from '@/internal/utils/last.ts';

import {useDialogContext} from './DialogContext';
import type {DialogState, DialogParams} from './DialogReducer';
import {Actions} from './DialogReducer';

const useSelector = <TResult,>(callback: (arg0: DialogState) => TResult) => {
    const {state} = useDialogContext();
    return callback(state);
};

export const useDialogState = (id: string) => {
    const {dispatch} = useDialogContext();
    const openDialog = useCallback(
        (params?: DialogParams) => {
            dispatch({
                type: Actions.DIALOG_OPEN,
                id,
                params,
            });
        },
        [id, dispatch]
    );
    const closeDialog = useCallback(() => {
        dispatch({
            type: Actions.DIALOG_CLOSE,
            id,
        });
    }, [id, dispatch]);
    const topDialogId = useSelector((state: DialogState) => {
        const topDialog = last(state.open);
        return topDialog?.id;
    });
    const isOpen = id === topDialogId;
    const dialogParams = useSelector((state: DialogState) => {
        const topDialog = state.open.find(({id: dialogId}) => id === dialogId);
        return topDialog?.params;
    });
    return {
        openDialog,
        closeDialog,
        isOpen,
        dialogParams,
    };
};
