import type {ComponentProps, FC} from 'react';
import {useMemo} from 'react';

import {Dialog, useDialogState} from '@/lib/Dialog';
import {NumberDecimal} from '@/lib/Number';
import {IconDelete, IconClose} from '@/internal/Icons';

import classes from './Dialog.module.css';

export type Props = {
    selectionAmount?: number;
    onDeleteConfirmation: () => void;
    id: string;
};

export const DeleteDialog: FC<Props> = ({selectionAmount, onDeleteConfirmation, id}) => {
    const {closeDialog} = useDialogState(id);
    const actions = useMemo<ComponentProps<typeof Dialog>['actions']>(
        () =>
            [
                [
                    {
                        title: 'Cancel',
                        type: 'default',
                        icon: IconClose,
                        onClick: () => {
                            closeDialog();
                        },
                    },
                    {
                        title: 'Delete',
                        type: 'danger',
                        icon: IconDelete,
                        onClick: () => {
                            onDeleteConfirmation();
                            closeDialog();
                        },
                    },
                ],
            ] as const,
        [closeDialog, onDeleteConfirmation]
    );
    return (
        <Dialog
            animation="scale-in"
            id={id}
            className={classes.deleteDialog}
            actions={actions}
            showCloseButton={false}>
            Do you want to delete <NumberDecimal value={selectionAmount} /> row(s)?
        </Dialog>
    );
};
