import type {FC} from 'react';
import Error from '@material-symbols/svg-700/sharp/error.svg?react';

import {Icon} from './Icon.tsx';

type Props = {
    className?: string;
};

export const IconError: FC<Props> = ({className}) => {
    return (
        <Icon className={className}>
            <Error />
        </Icon>
    );
};
