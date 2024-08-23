import type {ComponentProps, FC, ReactNode} from 'react';
import {useCallback, useState, useMemo} from 'react';

import {
    IconEllipsisVertical,
    IconPinRight,
    IconPinLeft,
    IconUnPin,
    IconFilter,
    IconSortAsc,
    IconSortDesc,
    IconSortOff,
} from '@/internal/Icons';
import {MenuActions} from '@/lib/Menu';
import {useDialogState} from '@/lib/Dialog';

import type {HeaderCell} from './../types.ts';
import classes from './Cells.module.css';

export type Props = ComponentProps<HeaderCell> & {
    children?: ReactNode;
};

export const ColumnHeaderCell: FC<Props> = ({title, headerContext}) => {
    const [isOpen, setOpen] = useState(false);
    const handleClick = useCallback(() => {
        setOpen(!isOpen);
    }, [isOpen]);
    const handleToggle = useCallback(
        (openState: boolean) => {
            setOpen(openState);
        },
        [setOpen]
    );
    const isPinned = headerContext.column.getIsPinned();

    const isSorted = headerContext.column.getIsSorted();

    const hasFilter = headerContext.column.getIsFiltered();

    const {openDialog} = useDialogState(headerContext.table.options.meta?.filterModalId as string);

    const actions = useMemo(
        () => [
            {
                title: hasFilter ? 'Edit filter' : 'Filter column',
                icon: IconFilter,
                onClick: () => {
                    openDialog({columnId: headerContext.column.id});
                    setOpen(false);
                },
            },
            {
                title: isSorted !== 'asc' ? 'Sort ascending' : 'Clear ascending',
                icon: isSorted !== 'asc' ? IconSortAsc : IconSortOff,
                onClick: () => {
                    isSorted !== 'asc' &&
                        headerContext.table.setSorting([
                            {desc: false, id: headerContext.column.id},
                        ]);
                    isSorted === 'asc' && headerContext.column.clearSorting();
                    setOpen(false);
                },
            },
            {
                title: isSorted !== 'desc' ? 'Sort descending' : 'Clear descending',
                icon: isSorted !== 'desc' ? IconSortDesc : IconSortOff,
                onClick: () => {
                    isSorted !== 'desc' &&
                        headerContext.table.setSorting([{desc: true, id: headerContext.column.id}]);
                    isSorted === 'desc' && headerContext.column.clearSorting();
                    setOpen(false);
                },
            },
            {
                title: isPinned !== 'left' ? 'Pin left' : 'Unpin left',
                icon: isPinned !== 'left' ? IconPinLeft : IconUnPin,
                onClick: () => {
                    setOpen(false);
                    if (isPinned !== 'left') {
                        headerContext.column.pin('left');
                    } else {
                        headerContext.column.pin(false);
                    }
                },
            },
            {
                title: isPinned !== 'right' ? 'Pin right' : 'Unpin right',
                icon: isPinned !== 'right' ? IconPinRight : IconUnPin,
                onClick: () => {
                    setOpen(false);
                    if (isPinned !== 'right') {
                        headerContext.column.pin('right');
                    } else {
                        headerContext.column.pin(false);
                    }
                },
            },
        ],
        [hasFilter, headerContext.column, headerContext.table, isPinned, isSorted, openDialog]
    );
    return (
        <div className={classes.headerCell}>
            <div className={classes.columnTitle}>{title}</div>

            <div className={classes.columnActions}>
                <MenuActions
                    allowedPlacements={['bottom', 'bottom-end', 'bottom-start']}
                    variant="plain"
                    actions={actions}
                    isOpen={isOpen}
                    onToggle={handleToggle}>
                    <button className={classes.actionsButton} onClick={handleClick}>
                        <IconEllipsisVertical className={classes.actionsIcon} />
                    </button>
                </MenuActions>
            </div>
        </div>
    );
};
