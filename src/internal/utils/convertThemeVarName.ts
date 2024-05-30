import type {ThemeType} from '@/lib';

export const convertThemeVarName = (str: string) =>
    `fg-${str
        // camelToKebabCase
        .replace(/(?<![A-Z])[A-Z]/g, (letter: string) => `-${letter.toLowerCase()}`)
        // split numbers
        .replace(/(?<=\D)\d/g, (num: string) => `-${num}`)
        .toLowerCase()}`;

export const convertTheme = (theme: ThemeType) => {
    const entries = Object.entries(theme).map(([key, value]) => [convertThemeVarName(key), value]);
    return Object.fromEntries(entries);
};
