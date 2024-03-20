import {useCallback, useEffect} from 'react';

import {useNotificationContext} from './NotificationContext.ts';
import type {NotificationProps, NotificationState} from './NotificationReducer.ts';
import {Actions} from './NotificationReducer.ts';
import {useNotificationProps} from './useNotificationProps.ts';
import {useNotificationInstance} from './useNotificationInstance.ts';

const useSelector = <TResult,>(callback: (arg0: NotificationState) => TResult) => {
    const {state} = useNotificationContext();
    return callback(state);
};

const createNotification = (props: NotificationProps) => {
    return new window.Notification(props.title, {
        icon: props.icon,
        body: props.body,
        requireInteraction: props.requireInteraction,
    });
};

export const useNotificationState = (id: string) => {
    const {dispatch} = useNotificationContext();
    const instance = useNotificationInstance(id);
    const notificationProps = useNotificationProps(id);
    const isOpen = useSelector((state: NotificationState) => state.open.some(notificationId => notificationId === id));
    const handleSelfClose = useCallback(() => {
        dispatch({
            type: Actions.NOTIFICATION_CLOSE,
            id,
        });
    }, [dispatch, id]);

    useEffect(() => {
        instance?.addEventListener('close', handleSelfClose);
        return () => {
            instance?.removeEventListener('close', handleSelfClose);
        };
    }, [handleSelfClose, instance]);

    const openNotification = useCallback(() => {
        /* Partially supported in Firefox. The new notification will not re-appear */
        if (isOpen) {
            instance?.close();
        }
        if (window.Notification.permission === 'granted') {
            dispatch({type: Actions.NOTIFICATION_OPEN, id, instance: createNotification(notificationProps)});
        } else if (window.Notification.permission !== 'denied') {
            window.Notification.requestPermission().then(nextPermission => {
                if (nextPermission === 'granted') {
                    dispatch({type: Actions.NOTIFICATION_OPEN, id, instance: createNotification(notificationProps)});
                }
            });
        }
    }, [dispatch, id, instance, isOpen, notificationProps]);

    const closeNotification = useCallback(() => {
        instance?.close();
        dispatch({type: Actions.NOTIFICATION_CLOSE, id});
    }, [dispatch, id, instance]);

    return {
        /**
         * Show notification to the user.
         * Warning! Will not work from component scope. Needs to be run as an effect
         * @example
         * const {openNotificaton} = useNotificationState(id);
         * const handleClick = useCallback(() => {
         *     openNotification();
         * }, [openNotification]);
         */
        openNotification,
        /**
         * Hide notification.
         * Warning! Will not work from component scope. Needs to be run as an effect
         * @example
         * const {openNotificaton} = useNotificationState(id);
         * const handleClick = useCallback(() => {
         *     openNotification();
         * }, [openNotification]);
         */
        closeNotification,
        /** Current visibility of notification */
        isOpen,
        /**
         * Indicates the current permission granted by the user for the current origin to display web notifications
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Notification/permission_static
         */
        permission: window.Notification.permission,
    };
};
