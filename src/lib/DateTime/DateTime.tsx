import {forwardRef, useMemo} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import {useBrowserLocale} from '@/internal/hooks/useBrowserLocale.ts';
import type {Locale} from '@/internal/locale';

import classes from './DateTime.module.css';
import type {DateFormatOptions} from './types.ts';

export type Props = DataAttributes &
    LibraryProps & {
        /**
         * String representing the date in a simplified format based on ISO 8601.
         * Is always 24 or 27 characters long.
         * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#date_time_string_format
         * @see https://en.wikipedia.org/wiki/ISO_8601
         */
        value?: string;
        /**
         * Provide a string with a BCP 47 language tag or an Intl.Locale instance,
         * or an array of such locale identifiers. Defaults to user setting
         * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#locales
         */
        locale?: Locale;
        /**
         * Prevents line wrapping of formatted dates and times
         */
        enableNoWrap?: boolean;
    } & DateFormatOptions;

export const DateTime = forwardRef<HTMLSpanElement, Props>(
    (
        {
            className,
            locale: localeProp,
            value = '',
            weekday,
            era,
            year,
            month,
            day,
            hour,
            minute,
            second,
            timeZoneName,
            hour12,
            timeZone,
            enableNoWrap = true,
            ...nativeProps
        },
        ref
    ) => {
        const userLocale = useBrowserLocale();
        const locale = localeProp ? localeProp : userLocale;
        const date = useMemo(() => new Date(value), [value]);
        const formattedValue = new Intl.DateTimeFormat(locale, {
            weekday,
            era,
            year,
            month,
            day,
            hour,
            minute,
            second,
            timeZoneName,
            hour12,
            timeZone,
        }).format(date);
        return (
            value && (
                <span
                    {...nativeProps}
                    className={classNames(
                        classes.number,
                        {[classes.noWrap]: enableNoWrap},
                        className
                    )}
                    ref={ref}>
                    {formattedValue}
                </span>
            )
        );
    }
);

DateTime.displayName = 'DateTime';
