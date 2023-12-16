import type {FC} from 'react';
import CloudUploadIcon from '@material-symbols/svg-700/sharp/cloud_upload.svg?react';
// import classNames from 'classnames';

// import classes from './Icon.module.css';
import {Icon} from './Icon.tsx';

type Props = {
    className?: string;
};

export const CloudUpload: FC<Props> = ({className}) => {
    return (
        <Icon className={className}>
            <CloudUploadIcon />
        </Icon>
    );
};
