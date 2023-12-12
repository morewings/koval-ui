import type {FC} from 'react';
import Email from '@material-symbols/svg-700/sharp/alternate_email.svg?react';

import {Icon} from './Icon.tsx';

export const IconEmail: FC = () => {
    return (
        <Icon>
            <Email />
        </Icon>
    );
};
