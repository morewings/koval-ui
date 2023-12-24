import type {FC, SVGProps} from 'react';
import Calendar from '@material-symbols/svg-700/sharp/calendar_month.svg?react';
import classNames from 'classnames';

import classes from './Icon.module.css';

type Props = SVGProps<SVGSVGElement> & {
    className?: string;
};

export const IconCalendar: FC<Props> = ({className, ...restProps}) => {
    return <Calendar className={classNames(classes.icon, className)} {...restProps} />;
};
