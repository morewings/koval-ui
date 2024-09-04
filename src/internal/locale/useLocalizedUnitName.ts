import type {UnitDisplayModes} from '@/lib/Number';
import {NumberStyles} from '@/lib/Number';

import type {Units} from './units.ts';
import {useBrowserLocale} from './useBrowserLocale.ts';
import type {Locale} from './types.ts';

/**
 * Utility hook. Returns localized supported unit name.
 * @see https://tc39.es/ecma402/#table-sanctioned-single-unit-identifiers
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#unit_2
 */
export const useLocalizedUnitName = (
    unit: keyof typeof Units,
    unitDisplay?: keyof typeof UnitDisplayModes,
    locale?: Locale
) => {
    const browserLocale = useBrowserLocale();
    const normalizedLocale = locale || browserLocale;
    return new Intl.NumberFormat(normalizedLocale, {
        style: NumberStyles.unit,
        unitDisplay,
        unit,
    });
};
