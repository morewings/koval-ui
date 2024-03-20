import {useNotificationContext} from './NotificationContext.ts';
import type {Id} from './NotificationReducer.ts';

export const useNotificationProps = (id: Id) => {
    const {state} = useNotificationContext();
    return state.props[id];
};
