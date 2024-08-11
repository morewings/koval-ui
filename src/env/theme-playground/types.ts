import type {PublicThemeType} from './../../lib/Theme';

export type ThemeConfigType = {
    name: string;
    color?: string;
    themeObject: PublicThemeType;
};

export enum ColorsList {
    do = 'colorDo',
    re = 'colorRe',
    mi = 'colorMi',
    fa = 'colorFa',
    sol = 'colorSol',
    la = 'colorLa',
}
