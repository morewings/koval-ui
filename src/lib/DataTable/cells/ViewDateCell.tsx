import type {ComponentProps, FC} from 'react';

import {DateTime} from '@/lib/DateTime';
import type {Locale} from '@/internal/locale';

import classes from './Cells.module.css';
import type {CellComponent} from './../types.ts';

export type Props = ComponentProps<CellComponent>;

export const ViewDateCell: FC<Props> = ({value, cellContext, ...restProps}) => {
    const locale = cellContext.table.options.meta?.locale as Locale;
    return (
        <div className={classes.viewDateCell}>
            <DateTime {...restProps} value={String(value)} locale={locale} />
        </div>
    );
};
