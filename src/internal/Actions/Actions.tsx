import type {ReactNode} from 'react';
import {forwardRef} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';

import type {Props as ActionProps} from './ActionButton.tsx';
import {ActionsTree} from './ActionsTree.tsx';
import {Variants} from './Variants.ts';
import classes from './Actions.module.css';

export type Props = DataAttributes &
    LibraryProps & {
        children?: ReactNode;
        /** Provide an array of actions with callbacks */
        actions?: (ActionProps | [ActionProps, ActionProps])[];
        /** Set design of Actions block */
        variant?: keyof typeof Variants;
        /** Provide CSS class name for action button */
        classNameAction?: string;
        /** Provide CSS class name for action button row container */
        classNameRow?: string;
    };

export const Actions = forwardRef<HTMLDivElement, Props>(
    (
        {
            children,
            className,
            actions = [],
            variant = Variants.primary,
            classNameAction,
            classNameRow,
            ...nativeProps
        },
        ref
    ) => {
        return (
            <div {...nativeProps} className={classNames(classes.actions, className)} ref={ref}>
                <ActionsTree
                    actions={actions}
                    classNameAction={classNames(
                        {
                            [classes.primaryAction]: variant === Variants.primary,
                            [classes.invertedAction]: variant === Variants.inverted,
                        },
                        classNameAction
                    )}
                    classNameRow={classNames(classes.actionRow, classNameRow)}
                />
            </div>
        );
    }
);

Actions.displayName = 'Actions';
