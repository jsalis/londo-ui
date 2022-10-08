import { useState, useEffect } from "react";

/**
 * Uses a CSS media query.
 */
export function useMediaQuery(query: string, initialState = false) {
    const [match, setMatch] = useState(initialState);

    useEffect(() => {
        let mounted = true;
        const mediaQueryList = window.matchMedia(query);
        const onChange = () => {
            if (mounted) {
                setMatch(mediaQueryList.matches);
            }
        };

        mediaQueryList.addListener(onChange);
        setMatch(mediaQueryList.matches);

        return () => {
            mounted = false;
            mediaQueryList.removeListener(onChange);
        };
    }, [query]);

    return match;
}
