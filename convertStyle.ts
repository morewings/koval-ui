import fs from 'fs';

import {theme} from './src/lib/Theme/theme.ts';
import {convertThemeVarName} from './src/internal/utils/convertThemeVarName';

const styleString = Object.entries(theme)
    .map(([key, value]) => `${convertThemeVarName(key)}: ${value};`)
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
