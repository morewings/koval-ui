import {forwardRef, useMemo} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import {useBrowserLocale} from '@/internal/locale';
import type {Locale, LanguageCodes} from '@/internal/locale';

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
         * Provide a two-letter ISO 639-1 language code
         * @see https://www.iso.org/iso-639-language-code
         */
        languageCode: keyof typeof LanguageCodes;
    };

export const NameLanguage = forwardRef<HTMLDivElement, Props>(
    ({className, locale: localeProp, languageCode, ...nativeProps}, ref) => {
        const userLocale = useBrowserLocale();
        const locale = localeProp ? localeProp : userLocale;
        const formattedValue = useMemo(
            () => new Intl.DisplayNames(locale, {type: 'language'}).of(languageCode),
            [languageCode, locale]
        );

        return (
            <span {...nativeProps} className={classNames(classes.name, className)} ref={ref}>
                {formattedValue}
            </span>
        );
    }
);

NameLanguage.displayName = 'NameLanguage';
