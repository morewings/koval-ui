import type {ReactNode} from 'react';
import {useMemo, forwardRef} from 'react';
import type {ColumnPinningPosition} from '@tanstack/react-table';
import {useLocalTheme} from 'css-vars-hook';
import classNames from 'classnames';

import {useLinkRefs} from '@/internal/hooks/useLinkRefs.ts';

import classes from './DataTable.module.css';

export type Props = {
    children?: ReactNode;
    leftMargin?: number;
    rightMargin?: number;
    isHighlighted?: boolean;
    isPinned?: ColumnPinningPosition;
    classname?: string;
    as: 'td' | 'th';
};

export const TableCell = forwardRef<HTMLTableCellElement, Props>(
    (
        {children, isPinned, leftMargin, rightMargin, classname, as = 'th', isHighlighted = false},
        ref
    ) => {
        const {LocalRoot, ref: localRef} = useLocalTheme<HTMLTableCellElement>();
        useLinkRefs(ref, localRef);
        const theme = useMemo(
            () => ({
                'left-margin': leftMargin,
                'right-margin': rightMargin,
            }),
            [leftMargin, rightMargin]
        );

        return (
            <LocalRoot
                theme={theme}
                as={as}
                className={classNames(
                    classes.tableCell,
                    {
                        [classes.highlighted]: isHighlighted,
                        [classes.pinned]: Boolean(isPinned),
                        [classes.pinnedHeader]: Boolean(isPinned) && as === 'th',
                        [classes.left]: isPinned === 'left',
                        [classes.right]: isPinned === 'right',
                    },
                    classname
                )}>
                {children}
            </LocalRoot>
        );
    }
);

TableCell.displayName = 'TableCell';
