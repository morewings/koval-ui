import type {FC} from 'react';
import AttachFileIcon from '@material-symbols/svg-700/sharp/attach_file.svg?react';
// import classNames from 'classnames';

// import classes from './Icon.module.css';
import {Icon} from './Icon.tsx';

type Props = {
    className?: string;
};

export const AttachFile: FC<Props> = ({className}) => {
    return (
        <Icon className={className}>
            <AttachFileIcon />
        </Icon>
    );
};
