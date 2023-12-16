import {useId} from 'react';

/** Allows to use React generated id when no id provided */
export const useInternalId = (id?: string) => {
    const backupId = useId();
    return id ? id : backupId;
};
