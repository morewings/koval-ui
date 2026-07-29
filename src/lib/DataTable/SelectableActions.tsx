import type {FC} from 'react';
import classNames from 'classnames';

import {Button, NumberDecimal} from '@/lib';
import {IconClear, IconDelete, IconEdit, IconSelectedRows} from '@/internal/Icons';

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
            <div
                className={classNames(classes.rowSelectionText, {
                    [classes.empty]: selectedRows === 0,
                })}>
                <NumberDecimal value={selectedRows} /> | <NumberDecimal value={totalRows} />
                <IconSelectedRows className={classes.rowSelectionIcon} />
            </div>
        </div>
    );
};
