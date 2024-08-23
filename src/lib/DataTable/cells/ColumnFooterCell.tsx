import type {ComponentProps, FC} from 'react';
import {useCallback} from 'react';

import {IconFilterOff, IconUnPin, IconSortOff} from '@/internal/Icons';

import type {FooterCell} from './../types.ts';
import classes from './Cells.module.css';

export type Props = ComponentProps<FooterCell>;

export const ColumnFooterCell: FC<Props> = ({cellContext}) => {
    const isFiltered = cellContext.column.getIsFiltered();
    const isSorted = Boolean(cellContext.column.getIsSorted());
    const isPinned = Boolean(cellContext.column.getIsPinned());

    const handleResetFilter = useCallback(() => {
        cellContext.column.setFilterValue('');
    }, [cellContext]);

    const handleResetSorting = useCallback(() => {
        cellContext.column.clearSorting();
    }, [cellContext]);

    const handleUnPin = useCallback(() => {
        cellContext.column.pin(false);
    }, [cellContext]);

    return (
        <div className={classes.footerCell}>
            {isFiltered && (
                <button
                    className={classes.footerButton}
                    title="Reset filter"
                    onClick={handleResetFilter}>
                    <IconFilterOff className={classes.footerIcon} />
                </button>
            )}
            {isSorted && (
                <button
                    className={classes.footerButton}
                    title="Reset sorting"
                    onClick={handleResetSorting}>
                    <IconSortOff className={classes.footerIcon} />
                </button>
            )}
            {isPinned && (
                <button className={classes.footerButton} title="Unpin column" onClick={handleUnPin}>
                    <IconUnPin className={classes.footerIcon} />
                </button>
            )}
        </div>
    );
};
