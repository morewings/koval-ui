import type {FC, SVGProps} from 'react';
import classNames from 'classnames';
import Icon from '@phosphor-icons/core/assets/bold/shuffle-bold.svg?react';

import classes from './Icon.module.css';

type Props = SVGProps<SVGSVGElement> & {
    className?: string;
};

export const IconSortOff: FC<Props> = ({className, ...restProps}) => {
    return <Icon className={classNames(classes.icon, className)} {...restProps} />;
};
