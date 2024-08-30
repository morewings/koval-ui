import {forwardRef, useMemo} from 'react';
import classNames from 'classnames';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import {useBrowserLocale} from '@/internal/hooks/useBrowserLocale.ts';
import classes from '@/lib/Number/Number.module.css';
import type {Units} from '@/internal/utils/units.ts';

import type {NumberProps} from './types.ts';
import {Styles, UnitDisplayModes} from './types.ts';
import {LocaleMatchers, Notations, CompactDisplayModes, SignDisplayModes} from './types.ts';

export type Props = DataAttributes &
    LibraryProps &
    NumberProps & {
        /**
         * Provide a unit for the number
         * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#unit_2
         */
        unit: keyof typeof Units;
        /**
         * The unit formatting style to use in unit formatting
         * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#unitdisplay
         */
        unitDisplay?: keyof typeof UnitDisplayModes;
    };

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
            unit,
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
                <span {...nativeProps} className={classNames(classes.number, className)} ref={ref}>
                    {formattedValue}
                </span>
            )
        );
    }
);

NumberUnit.displayName = 'NumberUnit';
