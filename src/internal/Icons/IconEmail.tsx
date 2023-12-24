import type {FC, SVGProps} from 'react';
import Email from '@material-symbols/svg-700/sharp/alternate_email.svg?react';
import classNames from 'classnames';

import classes from './Icon.module.css';

type Props = SVGProps<SVGSVGElement> & {
    className?: string;
};

export const IconEmail: FC<Props> = ({className, ...restProps}) => {
    return <Email className={classNames(classes.icon, className)} {...restProps} />;
};
