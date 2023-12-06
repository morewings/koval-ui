import type {FC} from 'react';
import Error from '@material-symbols/svg-700/sharp/error.svg?react';

import {Icon} from './Icon.tsx';

export const IconError: FC = () => {
    return (
        <Icon>
            <Error />
        </Icon>
    );
};
