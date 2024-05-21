import type {FC, SVGProps} from 'react';
import Loader from '@material-symbols/svg-700/sharp/progress_activity.svg?react';
import classNames from 'classnames';

import classes from './Icon.module.css';

type Props = SVGProps<SVGSVGElement> & {
    className?: string;
};

export const IconLoader: FC<Props> = ({className, ...restProps}) => {
    return (
        <Loader
            className={classNames(classes.icon, classes.rotation, classes.loading, className)}
            {...restProps}
        />
    );
};
