import type {ThemeType} from './theme.ts';

export type PublicThemeType = {
    /**
     * Main font used by most components of library
     */
    fontFamily: ThemeType['fontFamily'];
    /**
     * Monospaced font used by <code> and <pre>
     */
    fontFamilyMonospace: ThemeType['fontFamilyMonospace'];
    /**
     * Font size for H1 element
     */
    fontSizeH1: ThemeType['fontSizeH1'];
    /**
     * Font size for H2 element
     */
    fontSizeH2: ThemeType['fontSizeH2'];
    /**
     * Font size for H3 element
     */
    fontSizeH3: ThemeType['fontSizeH3'];
    /**
     * Font size for H4 element
     */
    fontSizeH4: ThemeType['fontSizeH4'];
    /**
     * Font size for H5 element
     */
    fontSizeH5: ThemeType['fontSizeH5'];
    /**
     * Font size for H6 element
     */
    fontSizeH6: ThemeType['fontSizeH6'];
    /**
     * Arbitrary text font size. Used by P element. Expected to be most readable
     */
    fontSizeText: ThemeType['fontSizeText'];
    /**
     * Medium font size
     */
    fontSizeMedium: ThemeType['fontSizeMedium'];
    /**
     * Large font size
     */
    fontSizeLarge: ThemeType['fontSizeLarge'];
    /**
     * Small font size
     */
    fontSizeSmall: ThemeType['fontSizeSmall'];
    /**
     * Default font weight. Expected to be most readable
     */
    fontWeightNormal: ThemeType['fontWeightNormal'];
    /**
     * Bolder font weight. Expected to look outstanding comparing to normal
     */
    fontWeightBolder: ThemeType['fontWeightBolder'];
    /**
     * Bold font weight. Expected to look outstanding comparing to bolder
     */
    fontWeightBold: ThemeType['fontWeightBold'];
    /**
     * Default text color. Expected to be most readable
     */
    textColor: ThemeType['textColor'];
    /**
     * Lowest background level. E.g. paper color
     */
    background000: ThemeType['background000'];
    /**
     * 100 background level. Good for delicate borders
     */
    background100: ThemeType['background100'];
    background200: ThemeType['background200'];
    background300: ThemeType['background300'];
    background400: ThemeType['background400'];
    /**
     * 500 background level. Good for strong headers
     */
    background500: ThemeType['background500'];
    /**
     * Highest background level. E.g. text color
     */
    background600: ThemeType['background600'];
    /**
     * First brand color. It is most visible in the theme.
     * Has to make a good contrast with background000 and background600
     */
    colorDo: ThemeType['colorDo'];
    /**
     * Second brand color. Darkest one. Has to make a good contrast with background000 and colorDo
     */
    colorRe: ThemeType['colorRe'];
    /**
     * Third brand color. Lightest one. Has to make a good contrast with background600 and colorDo
     */
    colorMi: ThemeType['colorMi'];
    /**
     * First alternative brand color. Used when needed to create an accented contrast with colorDo.
     * Has to make a good contrast with background000 and background600
     */
    colorFa: ThemeType['colorFa'];
    /**
     * Second alternative brand color. Darkest one.
     * Has to make a good contrast with background000 and colorFa
     */
    colorSol: ThemeType['colorSol'];
    /**
     * Third alternative brand color. Lightest one.
     * Has to make a good contrast with background600 and colorFa
     */
    colorLa: ThemeType['colorLa'];
    /**
     * Error/danger/failure indication color. Has to make a good contrast with background600 and background000
     */
    colorError: ThemeType['colorError'];
    /**
     * Warning indication color. Has to make a good contrast with background600 and background000
     */
    colorWarning: ThemeType['colorWarning'];
    /**
     * Success/approve/agree indication color. Has to make a good contrast with background600 and background000
     */
    colorSuccess: ThemeType['colorSuccess'];
    /**
     * Action/link indication color. Has to make a good contrast with background600 and background000
     */
    colorAction: ThemeType['colorAction'];
};
