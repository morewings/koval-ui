import type {FC, SVGProps} from 'react';
import Icon from '@phosphor-icons/core/assets/fill/picture-in-picture-fill.svg?react';
import classNames from 'classnames';

import classes from './Icon.module.css';

type Props = SVGProps<SVGSVGElement> & {
    className?: string;
};

export const IconPictureInPicture: FC<Props> = ({className, ...restProps}) => {
    return <Icon className={classNames(classes.icon, className)} {...restProps} />;
};
