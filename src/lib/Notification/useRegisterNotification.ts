import {useCallback} from 'react';

import {useNotificationContext} from './NotificationContext.ts';
import {Actions} from './NotificationReducer.ts';
import type {NotificationProps, Id} from './NotificationReducer.ts';

export const useRegisterNotification = () => {
    const {dispatch} = useNotificationContext();
    return useCallback(
        (id: Id, props: NotificationProps) => {
            dispatch({id, props, type: Actions.NOTIFICATION_REGISTER});
        },
        [dispatch]
    );
};
