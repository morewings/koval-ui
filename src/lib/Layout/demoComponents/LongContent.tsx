import type {FC} from 'react';

import classes from './LongContent.module.css';

export const LongContent: FC = () => {
    return <div className={classes.long}>This will scroll</div>;
};
