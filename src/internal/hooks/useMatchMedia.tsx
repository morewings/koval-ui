import {useState, useEffect} from 'react';

/**
 * React hook, use to match media queries
 * @see https://fireship.io/snippets/use-media-query-hook/
 */
export const useMatchMedia = (query: string) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const matchMedia = window.matchMedia;
        // fallback for usage in tests
        if (!matchMedia) {
            return;
        }
        const media = matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        const listener = () => setMatches(media.matches);
        window.addEventListener('resize', listener);
        return () => window.removeEventListener('resize', listener);
    }, [matches, query]);

    return matches;
};
