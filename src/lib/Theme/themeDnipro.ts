import {theme as themeInternal} from './theme.ts';
import type {PublicThemeType} from './PublicThemeType.ts';

export const theme = {
    ...themeInternal,
    colorDo: themeInternal.colorFa,
    colorRe: themeInternal.colorSol,
    colorMi: themeInternal.colorLa,
    colorFa: themeInternal.colorDo,
    colorSol: themeInternal.colorRe,
    colorLa: themeInternal.colorMi,
} as PublicThemeType;
