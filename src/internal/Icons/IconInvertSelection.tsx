import type {FC, SVGProps} from 'react';
import classNames from 'classnames';

import Icon from './svg/selection-inverse-fill.svg?react';
import classes from './Icon.module.css';

type Props = SVGProps<SVGSVGElement> & {
    className?: string;
};

export const IconInvertSelection: FC<Props> = ({className, ...restProps}) => {
    return <Icon className={classNames(classes.icon, className)} {...restProps} />;
};
