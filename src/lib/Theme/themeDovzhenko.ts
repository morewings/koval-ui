import {theme as themeInternal} from '@/lib/Theme/theme.ts';

import type {PublicThemeType} from './PublicThemeType.ts';

export const theme = {
    ...themeInternal,
    colorDo: '#808080',
    colorRe: '#3d3d3d',
    colorMi: '#d5d5d5',
    colorFa: '#a9a9a9',
    colorSol: '#494949',
    colorLa: '#e7e7e7',
} as PublicThemeType;
