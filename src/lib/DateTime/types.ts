export enum TimeNumericUnit {
    numeric = 'numeric',
    '2-digit' = '2-digit',
}

export enum TimeNamedUnit {
    long = 'long',
    short = 'short',
    narrow = 'narrow',
}

export enum TimeZoneName {
    short = 'short',
    long = 'long',
    shortOffset = 'shortOffset',
    longOffset = 'longOffset',
    shortGeneric = 'shortGeneric',
    longGeneric = 'longGeneric',
}

export type DateFormatOptions = {
    /**
     * The representation of the weekday
     * @example
     * 'long' // => Thursday
     * 'short' // => Thu
     * 'narrow' // => T
     */
    weekday?: keyof typeof TimeNamedUnit;
    /**
     * The representation of the era
     * @example
     * 'long' // => Anno Domini
     * 'short' // => AD
     * 'narrow' // => A
     */
    era?: keyof typeof TimeNamedUnit;
    /**
     * The representation of the year
     * @example
     * 'numeric' // => 2008
     * '2-digit' // => 08
     */
    year?: keyof typeof TimeNumericUnit;
    /**
     * The representation of the month
     * @example
     * 'long' // => March
     * 'short' // => Mar
     * 'narrow' // => M
     * 'numeric' // => 3
     * '2-digit' // => 03
     */
    month?: keyof typeof TimeNumericUnit | keyof typeof TimeNamedUnit;
    /**
     * The representation of the day
     * @example
     * 'numeric' // => 6
     * '2-digit' // => 06
     */
    day?: keyof typeof TimeNumericUnit;
    /**
     * The representation of the hour
     * @example
     * 'numeric' // => 6
     * '2-digit' // => 06
     */
    hour?: keyof typeof TimeNumericUnit;
    /**
     * The representation of the minute
     * @example
     * 'numeric' // => 6
     * '2-digit' // => 06
     */
    minute?: keyof typeof TimeNumericUnit;
    /**
     * The representation of the second
     * @example
     * 'numeric' // => 6
     * '2-digit' // => 06
     */
    second?: keyof typeof TimeNumericUnit;
    /**
     * The localized representation of the time zone name
     * @example
     * 'long' // => Long localized form (Pacific Standard Time, Nordamerikanische Westküsten-Normalzeit)
     * 'short' // => Short localized form (PST, GMT-8)
     * 'shortOffset' // => Short localized GMT format (GMT-8)
     * 'longOffset' // => Long localized GMT format (GMT-08:00)
     * 'shortGeneric' // => Short generic non-location format (PT, Los Angeles Zeit).
     * 'longGeneric' // => Long generic non-location format (Pacific Time, Nordamerikanische Westküstenzeit)
     */
    timeZoneName?: keyof typeof TimeZoneName;
    /**
     * Whether to use 12-hour time (as opposed to 24-hour time)
     */
    hour12?: boolean;
    /**
     * The time zone to use
     * @see https://www.iana.org/time-zones
     */
    timeZone?: string;
};
