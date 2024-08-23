import type {FC, ReactNode} from 'react';
import {useMemo, memo} from 'react';
import {useLocalTheme} from 'css-vars-hook';

import classes from './Cells.module.css';

export type Props = {
    children?: ReactNode;
    columnWidth?: number;
};

export const CellWrapper: FC<Props> = memo(({children, columnWidth = 166}) => {
    const {LocalRoot} = useLocalTheme();
    const theme = useMemo(() => ({'column-width': columnWidth}), [columnWidth]);
    return (
        <LocalRoot className={classes.cellWrapper} theme={theme}>
            {children}
        </LocalRoot>
    );
});

CellWrapper.displayName = 'CellWrapper';
