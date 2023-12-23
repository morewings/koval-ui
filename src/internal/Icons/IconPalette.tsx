import type {FC} from 'react';
import Palette from '@material-symbols/svg-700/sharp/palette.svg?react';

import {Icon} from './Icon.tsx';

type Props = {
    className?: string;
};

export const IconPalette: FC<Props> = ({className}) => {
    return (
        <Icon className={className}>
            <Palette />
        </Icon>
    );
};
