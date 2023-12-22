import type {FC} from 'react';
import Calendar from '@material-symbols/svg-700/sharp/calendar_month.svg?react';

import {Icon} from './Icon.tsx';

type Props = {
    className?: string;
};

export const IconCalendar: FC<Props> = ({className}) => {
    return (
        <Icon className={className}>
            <Calendar />
        </Icon>
    );
};
