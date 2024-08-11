import type {FC} from 'react';
// @ts-expect-error TODO: maybe fix later
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {useCallback} from 'react';
import {styled} from '@storybook/theming';
// import {BooleanControl} from '@storybook/blocks';

import type {PublicThemeType} from './../../../lib/Theme';
import {ColorsList} from '../types';
import {Control} from './Control';

type PanelContentProps = {
    onColorChange: (arg0: Record<string, string>) => void;
    onBackgroundInvert: (bgColors: object) => void;
    vanillaTheme?: PublicThemeType;
    theme: Partial<PublicThemeType>;
};

const Wrapper = styled.div`
    padding: 12px;
`;

const FieldSet = styled.fieldset`
    display: flex;
    flex-direction: row;
    gap: 36px;
    max-width: 100%;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 24px;
    border-color: hsla(203, 50%, 30%, 0.15);
`;

const Legend = styled.legend`
    font-size: 16px;
    color: #73828c;
    font-weight: bolder;
`;

// const BooleanWrapper = styled.div`
//     display: flex;
//     flex-direction: row;
//     gap: 12px;
//     align-items: center;
//     & > span {
//         font-weight: bold;
//     }
//     & > label {
//         margin-bottom: 0;
//     }
// `;

// type BackgroundColors = {
//     background000?: string;
//     background100?: string;
//     background200?: string;
//     background300?: string;
//     background400?: string;
//     background500?: string;
//     background600?: string;
// };
//
// const getBackground = (theme: BackgroundColors & unknown): BackgroundColors => {
//     return {
//         background000: theme['background000'],
//         background100: theme['background100'],
//         background200: theme['background200'],
//         background300: theme['background300'],
//         background400: theme['background400'],
//         background500: theme['background500'],
//         background600: theme['background600'],
//     };
// };
//
// const getInvertedBackground = (theme: BackgroundColors & unknown): BackgroundColors => {
//     return {
//         background000: theme['background600'],
//         background100: theme['background500'],
//         background200: theme['background400'],
//         background300: theme['background300'],
//         background400: theme['background200'],
//         background500: theme['background100'],
//         background600: theme['background000'],
//     };
// };

export const Playground: FC<PanelContentProps> = ({onColorChange, vanillaTheme, theme}) => {
    // const [inverted, setInverted] = useState<undefined | boolean>(false);

    const handleChange = useCallback(
        (name?: string, value?: string) => {
            name && value && onColorChange({[name]: value});
        },
        [onColorChange]
    );

    // TODO: mode logic to Panel. Fix state problem
    // const handleInvert = useCallback(
    //     (value?: boolean) => {
    //         setInverted(value);
    //         if (vanillaTheme) {
    //             const nextTheme = value
    //                 ? getInvertedBackground(vanillaTheme)
    //                 : getBackground(vanillaTheme);
    //             onColorChange(nextTheme);
    //         }
    //     },
    //     [onColorChange, setInverted, vanillaTheme]
    // );

    return (
        <Wrapper>
            <FieldSet>
                <Legend>Brand colors</Legend>
                {Object.values(ColorsList).map(colorToken => {
                    return (
                        <Control
                            key={colorToken}
                            value={{...vanillaTheme, ...theme}[colorToken]}
                            name={colorToken}
                            onChange={handleChange}
                        />
                    );
                })}
            </FieldSet>
            <FieldSet>
                <Legend>Other colors</Legend>
                {/*<BooleanWrapper>*/}
                {/*    <span>Invert background colors:</span>*/}
                {/*    <BooleanControl value={inverted} onChange={handleInvert} name="Hello" />*/}
                {/*</BooleanWrapper>*/}
                <Control
                    value={{...vanillaTheme, ...theme}.textColor}
                    name="Text"
                    onChange={handleChange}
                />
            </FieldSet>
        </Wrapper>
    );
};
