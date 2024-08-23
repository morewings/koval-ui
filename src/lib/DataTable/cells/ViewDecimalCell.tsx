import type {ComponentProps, FC} from 'react';

import {NumberDecimal} from '@/lib/Number';
import type {Locale} from '@/internal/locale';

import classes from './Cells.module.css';
import type {CellComponent} from './../types.ts';

export type Props = ComponentProps<CellComponent>;

export const ViewDecimalCell: FC<Props> = ({value, cellContext, ...restProps}) => {
    const locale = cellContext.table.options.meta?.locale as Locale;
    return (
        <div className={classes.viewNumberCell}>
            <NumberDecimal {...restProps} locale={locale} value={Number(value)} />
        </div>
    );
};
