import { useState, useEffect } from "react";

import { useCallbackRef } from "./use-callback-ref";

/**
 * Uses fullscreen state for a given element.
 */
export function useFullscreen(el = document.body) {
    const isSupported = document.fullscreenEnabled;
    const [isFullscreen, setIsFullscreen] = useState(() => {
        return document.fullscreenElement === el;
    });

    useEffect(() => {
        const listener = () => setIsFullscreen(document.fullscreenElement === el);
        document.addEventListener("fullscreenchange", listener);
        return () => document.removeEventListener("fullscreenchange", listener);
    }, [el]);

    const enter = useCallbackRef(() => {
        return el.requestFullscreen();
    });

    const exit = useCallbackRef(() => {
        return document.exitFullscreen();
    });

    const toggle = useCallbackRef(() => {
        return isFullscreen ? exit() : enter();
    });

    return { isSupported, isFullscreen, enter, exit, toggle };
}
