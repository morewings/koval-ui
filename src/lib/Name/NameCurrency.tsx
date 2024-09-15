import {forwardRef, useMemo} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import {useBrowserLocale} from '@/internal/locale';
import type {Locale, CurrencyCodes} from '@/internal/locale';

import type {Styles} from './types.ts';
import classes from './Name.module.css';

export type Props = DataAttributes &
    LibraryProps & {
        /**
         * Provide a string with a BCP 47 language tag or an Intl.Locale instance,
         * or an array of such locale identifiers. Defaults to user setting
         * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames/DisplayNames#locales
         */
        locale?: Locale;
        /**
         * Select the formatting style to use.
         * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames/DisplayNames#style
         */
        style?: keyof typeof Styles;
        /**
         * Provide a three-letter ISO 4217 currency code
         * @see https://www.iso.org/iso-4217-currency-codes.html
         */
        currencyCode: keyof typeof CurrencyCodes;
    };

export const NameCurrency = forwardRef<HTMLDivElement, Props>(
    ({className, locale: localeProp, currencyCode, style, ...nativeProps}, ref) => {
        const userLocale = useBrowserLocale();
        const locale = localeProp ? localeProp : userLocale;
        const formattedValue = useMemo(
            () => new Intl.DisplayNames(locale, {type: 'currency', style}).of(currencyCode),
            [currencyCode, locale, style]
        );

        return (
            <span {...nativeProps} className={classNames(classes.name, className)} ref={ref}>
                {formattedValue}
            </span>
        );
    }
);

NameCurrency.displayName = 'NameCurrency';
