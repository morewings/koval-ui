import {forwardRef, useMemo} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import {useBrowserLocale} from '@/internal/locale';
import classes from '@/lib/Number/Number.module.css';

import type {NumberProps} from './types.ts';
import {Styles} from './types.ts';
import {LocaleMatchers, Notations, CompactDisplayModes, SignDisplayModes} from './types.ts';

export type Props = DataAttributes &
    LibraryProps &
    Omit<NumberProps, 'unitDisplay' | 'unit' | 'currency' | 'currencyDisplay' | 'currencySign'>;

export const NumberDecimal = forwardRef<HTMLSpanElement, Props>(
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
                fraction: {},
            },
            notation = Notations.standard,
            compactDisplay = CompactDisplayModes.short,
            grouping,
            signDisplay = SignDisplayModes.auto,
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
                          style: Styles.decimal,
                          minimumIntegerDigits: digitsConfig.integer?.minimum,
                          minimumFractionDigits: digitsConfig.fraction?.minimum,
                          minimumSignificantDigits: digitsConfig.significant?.minimum,
                          maximumSignificantDigits: digitsConfig.significant?.maximum,
                          maximumFractionDigits: digitsConfig.fraction?.maximum,
                          notation,
                          compactDisplay,
                          useGrouping: grouping,
                          signDisplay,
                      }).format(value)
                    : '',
            [
                compactDisplay,
                digitsConfig.fraction?.maximum,
                digitsConfig.fraction?.minimum,
                digitsConfig.integer?.minimum,
                digitsConfig.significant?.maximum,
                digitsConfig.significant?.minimum,
                grouping,
                locale,
                localeMatcher,
                notation,
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

NumberDecimal.displayName = 'NumberDecimal';
