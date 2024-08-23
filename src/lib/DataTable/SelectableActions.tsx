import type {FC} from 'react';

import {Button, NumberDecimal, Strong} from '@/lib';
import {IconClear, IconDelete, IconEdit} from '@/internal/Icons';

import classes from './DataTable.module.css';

export type Props = {
    onClear: () => void;
    onDeleteRequest: () => void;
    onEditRequest: () => void;
    selectedRows: number;
    totalRows: number;
};

export const SelectableActions: FC<Props> = ({
    onClear,
    selectedRows,
    onDeleteRequest,
    onEditRequest,
    totalRows,
}) => {
    const disabled = selectedRows === 0;
    return (
        <div className={classes.rowSelection}>
            <div className={classes.rowSelectionActions}>
                <Button
                    className={classes.rowSelectionButton}
                    prefix={IconClear}
                    size="small"
                    variant="alternative"
                    onClick={onClear}
                    disabled={disabled}>
                    Clear selection
                </Button>
                <Button
                    className={classes.rowSelectionButton}
                    onClick={onDeleteRequest}
                    size="small"
                    variant="alternative"
                    prefix={IconDelete}
                    disabled={disabled}>
                    Delete row(s)
                </Button>
                <Button
                    className={classes.rowSelectionButton}
                    onClick={onEditRequest}
                    size="small"
                    variant="alternative"
                    prefix={IconEdit}
                    disabled={disabled}>
                    Edit row(s)
                </Button>
            </div>
            <div className={classes.rowSelectionText}>
                <Strong>
                    <NumberDecimal value={selectedRows} />
                </Strong>{' '}
                of{' '}
                <Strong>
                    <NumberDecimal value={totalRows} />
                </Strong>{' '}
                rows selected
            </div>
        </div>
    );
};
