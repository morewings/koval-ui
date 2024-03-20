import type {FC} from 'react';
import {Fragment, useEffect} from 'react';

import {useRegisterNotification} from './useRegisterNotification.ts';
import type {NotificationProps, Id} from './NotificationReducer.ts';
import {useNotificationState} from './useNotificationState.tsx';

export type Props = NotificationProps & {
    /** Unique id of notification */
    id: Id;
    /** Callback triggered when Notification toggles */
    onToggle?: (isOpen: boolean) => void;
    onDenied?: () => void;
};

export const Notification: FC<Props> = ({
    id,
    title,
    icon,
    body,
    requireInteraction,
    onToggle = () => {},
    onDenied = () => {},
}) => {
    const registerNotification = useRegisterNotification();
    const {isOpen, permission} = useNotificationState(id);
    useEffect(() => {
        registerNotification(id, {title, icon, body, requireInteraction});
    }, [id, title, icon, body, requireInteraction, registerNotification]);

    useEffect(() => {
        onToggle(isOpen);
    }, [isOpen, onToggle]);

    useEffect(() => {
        permission === 'denied' && onDenied();
    }, [onDenied, permission]);

    return <Fragment />;
};
