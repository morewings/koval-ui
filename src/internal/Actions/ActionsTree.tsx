import type {FC, ComponentProps} from 'react';
import {useId} from 'react';
import classNames from 'classnames';

import {Action} from './Action.tsx';
import classes from './Actions.module.css';

export type Props = {
    actions?: (
        | ComponentProps<typeof Action>
        | [ComponentProps<typeof Action>, ComponentProps<typeof Action>]
    )[];
    classNameRow?: string;
    classNameAction?: string;
    actionComponent?: FC<ComponentProps<typeof Action>>;
};

export const ActionsTree: FC<Props> = ({
    actions = [],
    classNameRow,
    classNameAction,
    actionComponent: ActionButton = Action,
}) => {
    const id = useId();
    return actions.map((actionSlot, i) => {
        if (Array.isArray(actionSlot)) {
            const [left, right] = actionSlot;
            return (
                <div key={`${id}-${i}`} className={classNames(classes.row, classNameRow)}>
                    <ActionButton
                        {...left}
                        className={classNames(classes.actionButton, classNameAction)}
                    />
                    <ActionButton
                        {...right}
                        className={classNames(classes.actionButton, classNameAction)}
                    />
                </div>
            );
        } else {
            return (
                <div key={`${id}-${i}`} className={classNames(classes.row, classNameRow)}>
                    <ActionButton
                        {...actionSlot}
                        className={classNames(classes.actionButton, classNameAction)}
                    />
                </div>
            );
        }
    });
};
