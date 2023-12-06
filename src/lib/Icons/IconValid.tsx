import type {FC} from 'react';
import Check from '@material-symbols/svg-700/sharp/check.svg?react';

import {Icon} from './Icon.tsx';

export const IconValid: FC = () => {
    return (
        <Icon>
            <Check />
        </Icon>
    );
};
