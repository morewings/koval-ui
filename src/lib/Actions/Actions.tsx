import type {ReactNode} from 'react';
import {forwardRef} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import type {ActionProps} from '@/internal/Actions';
import {ActionsTree} from '@/internal/Actions';

import classes from './Actions.module.css';

enum Variants {
    primary = 'primary',
    inverted = 'inverted',
}

export type Props = DataAttributes &
    LibraryProps & {
        children?: ReactNode;
        /** Provide an array of actions with callbacks */
        actions?: (ActionProps | [ActionProps, ActionProps])[];
        /** Set design of Actions block */
        variant?: keyof typeof Variants;
    };

export const Actions = forwardRef<HTMLDivElement, Props>(
    ({children, className, actions = [], variant = Variants.primary, ...nativeProps}, ref) => {
        return (
            <div {...nativeProps} className={classNames(classes.actions, className)} ref={ref}>
                <ActionsTree
                    actions={actions}
                    classNameAction={classNames({
                        [classes.primaryAction]: variant === Variants.primary,
                        [classes.invertedAction]: variant === Variants.inverted,
                    })}
                    classNameRow={classes.actionRow}
                />
            </div>
        );
    }
);

Actions.displayName = 'Actions';
