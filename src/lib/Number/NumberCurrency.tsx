import {forwardRef, useMemo} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import {useBrowserLocale} from '@/internal/locale';
import classes from '@/lib/Number/Number.module.css';

import type {NumberProps} from './types.ts';
import {Styles} from './types.ts';
import {LocaleMatchers, CurrencyDisplayTypes, SignDisplayModes} from './types.ts';

export type Props = DataAttributes &
    LibraryProps &
    Omit<NumberProps, 'notation' | 'compactDisplay' | 'unitDisplay' | 'unit'>;

export const NumberCurrency = forwardRef<HTMLSpanElement, Props>(
    (
        {
            value,
            className,
            locale: localeProp,
            localeMatcher = LocaleMatchers['best fit'],
            digitsConfig = {
                integer: {
                    minimum: 1,
                },
                significant: {
                    minimum: 1,
                    maximum: 21,
                },
                fraction: {
                    maximum: 2,
                },
            },
            grouping,
            signDisplay = SignDisplayModes.auto,
            currency,
            currencyDisplay = CurrencyDisplayTypes.symbol,
            currencySign,
            ...nativeProps
        },
        ref
    ) => {
        const userLocale = useBrowserLocale();
        const locale = localeProp ? localeProp : userLocale;
        const formattedValue = useMemo(
            () =>
                value
                    ? new Intl.NumberFormat(locale, {
                          localeMatcher,
                          style: Styles.currency,
                          minimumIntegerDigits: digitsConfig.integer?.minimum,
                          minimumFractionDigits: digitsConfig.fraction?.minimum,
                          minimumSignificantDigits: digitsConfig.significant?.minimum,
                          maximumSignificantDigits: digitsConfig.significant?.maximum,
                          maximumFractionDigits: digitsConfig.fraction?.maximum,
                          useGrouping: grouping,
                          signDisplay,
                          currency,
                          currencyDisplay,
                          currencySign,
                      }).format(value)
                    : '',
            [
                currency,
                currencyDisplay,
                currencySign,
                digitsConfig.fraction?.maximum,
                digitsConfig.fraction?.minimum,
                digitsConfig.integer?.minimum,
                digitsConfig.significant?.maximum,
                digitsConfig.significant?.minimum,
                grouping,
                locale,
                localeMatcher,
                signDisplay,
                value,
            ]
        );
        return (
            value && (
                <span
                    {...nativeProps}
                    title={formattedValue}
                    className={classNames(classes.number, className)}
                    ref={ref}>
                    {formattedValue}
                </span>
            )
        );
    }
);

NumberCurrency.displayName = 'NumberCurrency';
