import type {ComponentProps, FC} from 'react';

import type {CurrencyCodes, Locale} from '@/internal/locale';
import {NumberCurrency} from '@/lib/Number';

import classes from './Cells.module.css';
import type {CellComponent} from './../types.ts';

export type Props = ComponentProps<CellComponent> & {
    currency?: keyof typeof CurrencyCodes;
};

export const ViewCurrencyCell: FC<Props> = ({
    value,
    currency = 'EUR',
    cellContext,
    ...restProps
}) => {
    const locale = cellContext.table.options.meta?.locale as Locale;
    return (
        <div className={classes.viewNumberCell}>
            <NumberCurrency
                {...restProps}
                locale={locale}
                currency={currency}
                value={Number(value)}
            />
        </div>
    );
};
