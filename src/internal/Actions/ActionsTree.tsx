import type {FC, ComponentProps} from 'react';
import {useId} from 'react';
import classNames from 'classnames';

import {ActionButton} from './ActionButton.tsx';
import classes from './ActionButton.module.css';

export type Props = {
    actions?: (
        | ComponentProps<typeof ActionButton>
        | [ComponentProps<typeof ActionButton>, ComponentProps<typeof ActionButton>]
    )[];
    classNameRow?: string;
    classNameAction?: string;
    actionComponent?: FC<ComponentProps<typeof ActionButton>>;
};

export const ActionsTree: FC<Props> = ({
    actions = [],
    classNameRow,
    classNameAction,
    actionComponent: ActionComponent = ActionButton,
}) => {
    const id = useId();
    return actions.map((actionSlot, i) => {
        if (Array.isArray(actionSlot)) {
            const [left, right] = actionSlot;
            return (
                <div key={`${id}-${i}`} className={classNames(classes.row, classNameRow)}>
                    <ActionComponent
                        {...left}
                        className={classNames(classes.actionButton, classNameAction)}
                    />
                    <ActionComponent
                        {...right}
                        className={classNames(classes.actionButton, classNameAction)}
                    />
                </div>
            );
        } else {
            return (
                <div key={`${id}-${i}`} className={classNames(classes.row, classNameRow)}>
                    <ActionComponent
                        {...actionSlot}
                        className={classNames(classes.actionButton, classNameAction)}
                    />
                </div>
            );
        }
    });
};
