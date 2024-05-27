import fs from 'fs';

import {theme} from './src/lib/Theme/theme.ts';

const convertName = (str: string) =>
    str
        // camelToKebabCase
        .replace(/[A-Z]/g, (letter: string) => `-${letter.toLowerCase()}`)
        // split numbers
        .replace(/(?<=\D)\d/g, (num: string) => `-${num}`);

const styleString = Object.entries(theme)
    .map(([key, value]) => `--fg-${convertName(key)}: ${value};`)
    .join('\n');

const template = `
/* prettier-ignore */
/* stylelint-disable */
:root {
    ${styleString}
}
`;

fs.writeFile('./src/lib/Theme/theme-placeholder.css', template, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log('The file was saved!');
});
