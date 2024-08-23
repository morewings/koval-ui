import type {FC, ComponentProps} from 'react';

import type {UnitDisplayModes} from '@/lib/Number';
import {NumberUnit} from '@/lib/Number';
import type {Locale, Units} from '@/internal/locale';

import classes from './Cells.module.css';
import type {CellComponent} from './../types.ts';

export type Props = ComponentProps<CellComponent> & {
    unit?: keyof typeof Units;
    unitDisplay?: keyof typeof UnitDisplayModes;
};

export const ViewUnitCell: FC<Props> = ({value, cellContext, unit, ...restProps}) => {
    const locale = cellContext.table.options.meta?.locale as Locale;
    return (
        <div className={classes.viewNumberCell}>
            <NumberUnit {...restProps} unit={unit} locale={locale} value={Number(value)} />
        </div>
    );
};
