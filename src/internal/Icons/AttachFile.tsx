import type {FC, SVGProps} from 'react';
import AttachFileIcon from '@material-symbols/svg-700/sharp/attach_file.svg?react';
import classNames from 'classnames';

import classes from './Icon.module.css';

type Props = SVGProps<SVGSVGElement> & {
    className?: string;
};

export const AttachFile: FC<Props> = ({className, ...restProps}) => {
    return <AttachFileIcon className={classNames(classes.icon, className)} {...restProps} />;
};
