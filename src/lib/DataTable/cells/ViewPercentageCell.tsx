import type {ComponentProps, FC} from 'react';

import type {NumberProps} from '@/lib/Number';
import {NumberPercent} from '@/lib/Number';
import type {Locale} from '@/internal/locale';

import type {CellComponent} from './../types.ts';
import classes from './Cells.module.css';

export type Props = ComponentProps<CellComponent> &
    Omit<NumberProps, 'notation' | 'compactDisplay' | 'value' | 'locale'>;

export const ViewPercentageCell: FC<Props> = ({value, cellContext, ...restProps}) => {
    const locale = cellContext.table.options.meta?.locale as Locale;
    return (
        <div className={classes.viewNumberCell}>
            <NumberPercent {...restProps} locale={locale} value={Number(value)} />
        </div>
    );
};
