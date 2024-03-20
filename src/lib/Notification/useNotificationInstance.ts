import {useNotificationContext} from './NotificationContext.ts';
import type {Id} from './NotificationReducer.ts';

export const useNotificationInstance = (id: Id): Notification | undefined => {
    const {state} = useNotificationContext();
    return state.instances[id];
};
