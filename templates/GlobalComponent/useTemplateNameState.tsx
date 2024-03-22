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
    const openTemplateName = useCallback(() => {
        dispatch({
            type: Actions.TEMPLATE_NAME_OPEN,
            id,
        });
    }, [id, dispatch]);
    const closeTemplateName = useCallback(() => {
        dispatch({
            type: Actions.TEMPLATE_NAME_CLOSE,
            id,
        });
    }, [id, dispatch]);
    const topTemplateNameId = useSelector((state: TemplateNameState) => last(state.open));
    const isOpen = id === topTemplateNameId;
    return {
        openTemplateName,
        closeTemplateName,
        isOpen,
    };
};
