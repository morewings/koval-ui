import type {FC, SVGProps} from 'react';
import Check from '@material-symbols/svg-700/sharp/check.svg?react';
import classNames from 'classnames';

import classes from '@/internal/Icons/Icon.module.css';

type Props = SVGProps<SVGSVGElement> & {
    className?: string;
};

export const IconValid: FC<Props> = ({className, ...restProps}) => {
    return <Check className={classNames(classes.icon, classes.valid, className)} {...restProps} />;
};
