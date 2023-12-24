import type {FC, SVGProps} from 'react';
import Palette from '@material-symbols/svg-700/sharp/palette.svg?react';
import classNames from 'classnames';

import classes from './Icon.module.css';

type Props = SVGProps<SVGSVGElement> & {
    className?: string;
};

export const IconPalette: FC<Props> = ({className, ...restProps}) => {
    return <Palette className={classNames(classes.icon, className)} {...restProps} />;
};
