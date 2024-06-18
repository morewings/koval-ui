import type {FC, ComponentProps} from 'react';

import {Actions, Variants as ActionVariants} from '@/internal/Actions';

import {Variants as MenuVariants} from './Variants.ts';
import type {Props as MenuProps} from './Menu.tsx';
import {Menu} from './Menu.tsx';
import classes from './Menu.module.css';

export type Props = Omit<MenuProps, 'content' | 'alignWidth'> & {
    actions?: ComponentProps<typeof Actions>['actions'];
};

export const MenuActions: FC<Props> = ({
    children,
    /** Provide an array of actions with callbacks */
    actions = [],
    /** Set design of Menu */
    variant = MenuVariants.bordered,
    ...restProps
}) => {
    const actionsVariant = {
        [MenuVariants.plain]: ActionVariants.inverted,
        [MenuVariants.bordered]: ActionVariants.primary,
    }[variant] as keyof typeof ActionVariants;
    return (
        <Menu
            {...restProps}
            variant={variant}
            content={
                <Actions
                    variant={actionsVariant}
                    actions={actions}
                    classNameRow={classes.row}
                    classNameAction={classes.actionButton}
                />
            }
            alignWidth={false}>
            {children}
        </Menu>
    );
};
