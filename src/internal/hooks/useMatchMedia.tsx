import {useState, useEffect} from 'react';

/**
 * React hook, use to match media queries
 * @see https://fireship.io/snippets/use-media-query-hook/
 */
export const useMatchMedia = (query: string) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        // fallback for usage in tests
        if (!window.matchMedia) {
            return;
        }
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        const listener = () => setMatches(media.matches);
        media.addEventListener('change', listener);
        return () => media.removeEventListener('change', listener);
    }, [matches, query]);

    return matches;
};
