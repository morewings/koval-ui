import type {ComponentProps, FC} from 'react';

import classes from './Cells.module.css';
import type {CellComponent} from './../types.ts';

export type Props = ComponentProps<CellComponent>;

export const ViewTextCell: FC<Props> = ({value}) => {
    return (
        <div title={String(value)} className={classes.viewTextCell}>
            {value}
        </div>
    );
};
