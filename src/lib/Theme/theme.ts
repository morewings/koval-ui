export const theme = {
    fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif,
        "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    testColor: 'red',
    sizeUnit: '6px',
    textSize: '16px',
    // colors
    textColor: '#111111',
    background000: 'white',
    background100: '#dedede',
    background200: '#a9a9a9',
    background300: '#808080',
    background400: '#525252',
    background500: '#363636',
    background600: '#000000',
    // theme
    colorDo: '#ffbe99',
    colorRe: '#61483a',
    colorMi: '#ffdea6',
    colorFa: '#597480',
    colorSol: '#99DFFF',
    // info colors
    colorError: '#FF0000',
    colorWarning: 'orange',
    colorSuccess: 'green',
    colorAction: 'blue',
};

export type ThemeType = Partial<typeof theme>;
