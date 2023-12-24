import type {FC, SVGProps} from 'react';
import Error from '@material-symbols/svg-700/sharp/error.svg?react';
import classNames from 'classnames';

import classes from './Icon.module.css';

type Props = SVGProps<SVGSVGElement> & {
    className?: string;
};

export const IconError: FC<Props> = ({className, ...restProps}) => {
    return <Error className={classNames(classes.icon, classes.error, className)} {...restProps} />;
};
