import { useState, useEffect, useCallback } from "react";

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

    const enter = useCallback(() => {
        el.requestFullscreen().catch(() => {
            /* noop */
        });
    }, [el]);

    const exit = useCallback(() => {
        document.exitFullscreen().catch(() => {
            /* noop */
        });
    }, []);

    const toggle = useCallback(() => {
        if (isFullscreen) {
            exit();
        } else {
            enter();
        }
    }, [isFullscreen, enter, exit]);

    return { isSupported, isFullscreen, enter, exit, toggle };
}
