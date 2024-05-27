export const convertThemeVarName = (str: string) =>
    `fg-${str
        // camelToKebabCase
        .replace(/[A-Z]/g, (letter: string) => `-${letter.toLowerCase()}`)
        // split numbers
        .replace(/(?<=\D)\d/g, (num: string) => `-${num}`)}`;
