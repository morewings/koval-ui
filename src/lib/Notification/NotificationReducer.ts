import {omit} from 'lodash/fp';
/**
 * Action names collection
 * @example
 * import { Actions } from './NotificationReducer';
 * dispatch({ type: Notification.NOTIFICATION_CLOSE})
 * dispatch({ type: Notification.NOTIFICATION_OPEN})
 * */
export enum Actions {
    NOTIFICATION_CLOSE = 'NOTIFICATION_CLOSE',
    NOTIFICATION_OPEN = 'NOTIFICATION_OPEN',
    NOTIFICATION_REGISTER = 'NOTIFICATION_REGISTER',
    NOTIFICATION_RE_OPEN = 'NOTIFICATION_RE_OPEN',
}

/** Dialog ID type */
export type Id = string;

export type NotificationProps = {
    /**
     * Defines a title for the notification, which is shown at the top of the notification window
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification#title
     */
    title: string;
    /**
     * URL of an image to be displayed in the notification
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification#icon
     */
    icon?: string;
    /**
     * Body text of the notification, which is displayed below the title
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification#body
     */
    body?: string;
    /**
     * Indicates that a notification should remain active until the user clicks or dismisses it, rather than closing automatically.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification#requireinteraction
     */
    requireInteraction?: boolean;
};

/** Dialog state type */
export type NotificationState = {
    /** List of open modals' IDs */
    open: Id[];
    props: Record<Id, NotificationProps>;
    instances: Record<Id, Notification>;
};

export const initialState = {
    open: [],
    props: {},
    instances: {},
} as NotificationState;

type CloseAction = {
    /** ID of target Dialog */
    id: Id;
    /** Action name */
    type: Actions.NOTIFICATION_CLOSE;
};

type OpenAction = {
    /** ID of target Dialog */
    id: Id;
    /** Action name */
    type: Actions.NOTIFICATION_OPEN;
    instance: Notification;
};

type RegisterAction = {
    /** ID of target Dialog */
    id: Id;
    /** Action name */
    type: Actions.NOTIFICATION_REGISTER;
    props: NotificationProps;
};

export type NotificationAction = CloseAction | OpenAction | RegisterAction;

const without = <TValue>(value: TValue, array: TValue[]) => {
    return array.filter(member => member !== value);
};

export const NotificationReducer = (state = initialState, action: NotificationAction): NotificationState => {
    switch (action.type) {
        case Actions.NOTIFICATION_CLOSE: {
            const {id} = action;
            const nextOpen = without(id, state.open);
            const nextInstances = omit([id], state.instances);
            return {
                ...state,
                open: nextOpen,
                instances: nextInstances,
            };
        }
        case Actions.NOTIFICATION_REGISTER: {
            const {id, props} = action;
            return {
                ...state,
                props: {
                    ...state.props,
                    [id]: props,
                },
            };
        }
        case Actions.NOTIFICATION_OPEN: {
            const {id, instance} = action;
            return {
                ...state,
                open: [...without(id, state.open), id],
                instances: {
                    ...state.instances,
                    [id]: instance,
                },
            };
        }
        default:
            return state;
    }
};
