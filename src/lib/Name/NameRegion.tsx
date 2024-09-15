import {forwardRef, useMemo} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import {useBrowserLocale} from '@/internal/locale';
import type {Locale, CountryCodes} from '@/internal/locale';

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
         * Provide a two-letter ISO 3166 region code
         * @see https://www.iso.org/iso-3166-country-codes.html
         */
        countryCode: keyof typeof CountryCodes;
    };

export const NameRegion = forwardRef<HTMLDivElement, Props>(
    ({className, locale: localeProp, countryCode, ...nativeProps}, ref) => {
        const userLocale = useBrowserLocale();
        const locale = localeProp ? localeProp : userLocale;
        const formattedValue = useMemo(
            () => new Intl.DisplayNames(locale, {type: 'region'}).of(countryCode),
            [countryCode, locale]
        );

        return (
            <span {...nativeProps} className={classNames(classes.name, className)} ref={ref}>
                {formattedValue}
            </span>
        );
    }
);

NameRegion.displayName = 'NameRegion';
