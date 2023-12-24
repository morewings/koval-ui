import type {FC, SVGProps} from 'react';
import Clock from '@material-symbols/svg-700/sharp/nest_clock_farsight_analog.svg?react';
import classNames from 'classnames';

import classes from './Icon.module.css';

type Props = SVGProps<SVGSVGElement> & {
    className?: string;
};

export const IconClock: FC<Props> = ({className, ...restProps}) => {
    return <Clock className={classNames(classes.icon, className)} {...restProps} />;
};
