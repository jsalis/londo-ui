import { useState, useEffect } from "react";

import { useCallbackRef } from "./use-callback-ref";

/**
 * Uses fullscreen state for a given element.
 *
 * @param {HTMLElement} [el]
 * @returns {{
 *     isSupported: Boolean,
 *     isFullscreen: Boolean,
 *     enter: function(),
 *     exit: function(),
 *     toggle: function()
 * }}
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
        el.requestFullscreen().catch(() => {
            /* noop */
        });
    });

    const exit = useCallbackRef(() => {
        document.exitFullscreen().catch(() => {
            /* noop */
        });
    });

    const toggle = useCallbackRef(() => {
        if (isFullscreen) {
            exit();
        } else {
            enter();
        }
    });

    return { isSupported, isFullscreen, enter, exit, toggle };
}
