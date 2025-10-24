import type {FC, SVGProps} from 'react';
import Icon from '@phosphor-icons/core/assets/fill/play-pause-fill.svg?react';
import classNames from 'classnames';

import classes from './Icon.module.css';

type Props = SVGProps<SVGSVGElement> & {
    className?: string;
};

export const IconPlayPause: FC<Props> = ({className, ...restProps}) => {
    return <Icon className={classNames(classes.icon, className)} {...restProps} />;
};
