import {forwardRef, useMemo} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import {useBrowserLocale} from '@/internal/locale';
import classes from '@/lib/Number/Number.module.css';
import {Units} from '@/internal/locale';

import type {NumberProps} from './types.ts';
import {Styles, UnitDisplayModes} from './types.ts';
import {LocaleMatchers, Notations, CompactDisplayModes, SignDisplayModes} from './types.ts';

export type Props = DataAttributes &
    LibraryProps &
    Omit<NumberProps, 'currency' | 'currencyDisplay' | 'currencySign'>;

export const NumberUnit = forwardRef<HTMLSpanElement, Props>(
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
            unit = Units.liter,
            unitDisplay = UnitDisplayModes.short,
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
                          style: Styles.unit,
                          minimumIntegerDigits: digitsConfig.integer?.minimum,
                          minimumFractionDigits: digitsConfig.fraction?.minimum,
                          minimumSignificantDigits: digitsConfig.significant?.minimum,
                          maximumSignificantDigits: digitsConfig.significant?.maximum,
                          maximumFractionDigits: digitsConfig.fraction?.maximum,
                          notation,
                          compactDisplay,
                          useGrouping: grouping,
                          signDisplay,
                          unit,
                          unitDisplay,
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
                unit,
                unitDisplay,
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

NumberUnit.displayName = 'NumberUnit';
