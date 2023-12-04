import type {FC} from 'react';
import Face from '@material-symbols/svg-400/sharp/face.svg?react';

import classes from './Icon.module.css';

export const Icon: FC = () => {
    return (
        <div className={classes.icon}>
            <Face color="var(--testColor)" width={24} height={24} />
        </div>
    );
};
