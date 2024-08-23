import type {Range} from '@/internal/utils/rangeType.ts';
import type {Units, CurrencyCodes, Locale} from '@/internal/locale';

export enum Styles {
    decimal = 'decimal',
    currency = 'currency',
    percent = 'percent',
    unit = 'unit',
}

export enum LocaleMatchers {
    lookup = 'lookup',
    'best fit' = 'best fit',
}

export enum Notations {
    standard = 'standard',
    'scientific' = 'scientific',
    'engineering' = 'engineering',
    'compact' = 'compact',
}

export enum CompactDisplayModes {
    short = 'short',
    long = 'long',
}

export enum SignDisplayModes {
    auto = 'auto',
    always = 'always',
    exceptZero = 'exceptZero',
    // TODO: not present in built in types
    // negative = 'negative',
    never = 'never',
}

export type DigitsConfig = {
    integer?: {
        /**
         * The minimum number of integer digits to use
         * @example
         * // minimumIntegerDigits=3
         * <Number value={3} /> // => 003
         * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#minimumintegerdigits
         */
        minimum?: Range<1, 22>;
    };
    fraction?: {
        /**
         * The minimum number of fraction digits to use
         * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#minimumfractiondigits
         */
        minimum?: Range<0, 101>;
        /**
         * The maximum number of fraction digits to use
         * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#maximumfractiondigits
         */
        maximum?: Range<0, 101>;
    };
    significant?: {
        /**
         * The minimum number of significant digits to use
         * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#minimumsignificantdigits
         */
        minimum?: Range<1, 22>;
        /**
         * The maximum number of significant digits to use
         * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#maximumsignificantdigits
         */
        maximum?: Range<1, 22>;
    };
};

export type NumberProps = {
    /** Provide a value to be formatted */
    value?: number;
    /**
     * Provide a string with a BCP 47 language tag or an Intl.Locale instance,
     * or an array of such locale identifiers. Defaults to user setting
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#locales
     */
    locale?: Locale;
    /**
     * The locale matching algorithm to use
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#localematcher
     */
    localeMatcher?: keyof typeof LocaleMatchers;
    /**
     * Provide a `digits` property config as an object
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#minimumintegerdigits
     */
    digitsConfig?: DigitsConfig;
    /**
     * The formatting that should be displayed for the number (not %, currency) (decimal, unit)
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#notation
     */
    notation?: keyof typeof Notations;
    /**
     * Only used when `notation` is `compact` (not %, currency) (decimal, unit)
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#compactdisplay
     */
    compactDisplay?: keyof typeof CompactDisplayModes;
    /**
     * Whether to use grouping separators, such as thousands' separators (not %) (decimal, unit, currency)
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#usegrouping
     */
    grouping?: boolean;
    /**
     * Display the sign for the number (all)
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#signdisplay
     */
    signDisplay?: keyof typeof SignDisplayModes;
    /**
     * Provide a unit for the number
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#unit_2
     */
    // Unit specific props
    unit?: keyof typeof Units;
    /**
     * The unit formatting style to use in unit formatting
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#unitdisplay
     */
    unitDisplay?: keyof typeof UnitDisplayModes;
    // Currency specific props
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

export enum CurrencyDisplayTypes {
    code = 'code',
    symbol = 'symbol',
    narrowSymbol = 'narrowSymbol',
    name = 'name',
}

export enum CurrencySignModes {
    standard = 'standard',
    accounting = 'accounting',
}

export enum UnitDisplayModes {
    short = 'short',
    narrow = 'narrow',
    long = 'long',
}
