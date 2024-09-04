import type {FC, SVGProps} from 'react';
import Icon from '@material-symbols/svg-700/sharp/filter_alt_off.svg?react';
import classNames from 'classnames';

import classes from './Icon.module.css';

type Props = SVGProps<SVGSVGElement> & {
    className?: string;
};

export const IconFilterOff: FC<Props> = ({className, ...restProps}) => {
    return <Icon className={classNames(classes.icon, className)} {...restProps} />;
};
