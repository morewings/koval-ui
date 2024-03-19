import {useCallback} from 'react';
import {last} from 'lodash/fp';

import {useTemplateNameContext} from './TemplateNameContext.ts';
import type {TemplateNameState} from './TemplateNameReducer.ts';
import {Actions} from './TemplateNameReducer.ts';

const useSelector = (callback: (arg0: TemplateNameState) => string | undefined) => {
    const {state} = useTemplateNameContext();
    return callback(state);
};

export const useTemplateNameState = (id: string) => {
    const {dispatch} = useTemplateNameContext();
    const openNotification = useCallback(() => {
        dispatch({
            type: Actions.TEMPLATE_NAME_OPEN,
            id,
        });
    }, [id, dispatch]);
    const closeNotification = useCallback(() => {
        dispatch({
            type: Actions.TEMPLATE_NAME_CLOSE,
            id,
        });
    }, [id, dispatch]);
    const topDialogId = useSelector((state: TemplateNameState) => last(state.open));
    const isOpen = id === topDialogId;
    return {
        openNotification,
        closeNotification,
        isOpen,
    };
};
