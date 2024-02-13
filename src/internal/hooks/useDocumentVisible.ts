import {useEffect, useState} from 'react';

/** React hook. Checks if browser tab is visible on screen */
export const useDocumentVisible = () => {
    const [documentVisible, setDocumentVisible] = useState(document.visibilityState);

    useEffect(() => {
        const handleVisibilityChange = () => setDocumentVisible(document.visibilityState);

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, []);

    return documentVisible === 'visible';
};
