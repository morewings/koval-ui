import {theme as themeInternal} from './theme.ts';
import type {PublicThemeType} from './PublicThemeType.ts';

export const theme = themeInternal as PublicThemeType;
