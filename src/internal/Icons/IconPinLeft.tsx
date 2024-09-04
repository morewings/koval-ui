import type {FC, SVGProps} from 'react';
import Icon from '@phosphor-icons/core/assets/bold/columns-plus-left-bold.svg?react';
import classNames from 'classnames';

import classes from './Icon.module.css';

type Props = SVGProps<SVGSVGElement> & {
    className?: string;
};

export const IconPinLeft: FC<Props> = ({className, ...restProps}) => {
    return <Icon className={classNames(classes.icon, className)} {...restProps} />;
};
