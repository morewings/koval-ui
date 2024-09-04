import {forwardRef, useMemo} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import type {CurrencyCodes} from '@/internal/locale';
import {useBrowserLocale} from '@/internal/locale';
import classes from '@/lib/Number/Number.module.css';

import type {NumberProps, CurrencySignModes} from './types.ts';
import {Styles} from './types.ts';
import {LocaleMatchers, CurrencyDisplayTypes, SignDisplayModes} from './types.ts';

export type Props = DataAttributes &
    LibraryProps &
    Omit<NumberProps, 'notation' | 'compactDisplay'> & {
        /**
         * Provide ISO 4217 currency code
         * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#currency_2
         */
        currency: keyof typeof CurrencyCodes;
        /**
         * How to display the currency in currency formatting
         * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#currencydisplay
         */
        currencyDisplay?: keyof typeof CurrencyDisplayTypes;
        /**
         * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#currencysign
         */
        currencySign?: keyof typeof CurrencySignModes;
    };

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
                <span {...nativeProps} className={classNames(classes.number, className)} ref={ref}>
                    {formattedValue}
                </span>
            )
        );
    }
);

NumberCurrency.displayName = 'NumberCurrency';
