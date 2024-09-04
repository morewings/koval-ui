import type {FC, SVGProps} from 'react';
import classNames from 'classnames';
import Icon from '@phosphor-icons/core/assets/fill/broom-fill.svg?react';

import classes from './Icon.module.css';
// import Icon from './svg/broom-fill.svg?react';

type Props = SVGProps<SVGSVGElement> & {
    className?: string;
};

export const IconClear: FC<Props> = ({className, ...restProps}) => {
    return <Icon className={classNames(classes.icon, className)} {...restProps} />;
};
