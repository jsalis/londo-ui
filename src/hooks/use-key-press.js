import { useState, useEffect } from "react";

import { useCallbackRef } from "./use-callback-ref";
import { useEventListener } from "./use-event-listener";

/**
 * Uses a key press event.
 *
 * @param {String}   key
 * @param {Function} handler
 */
export function useKeyPress(key, handler) {
    const savedHandler = useCallbackRef(handler);
    const [keyPressed, setKeyPressed] = useState(false);

    useEventListener(
        "keydown",
        (event) => {
            if (event.key === key && !keyPressed) {
                setKeyPressed(true);
            }
        },
        window,
        true
    );

    useEventListener(
        "keyup",
        (event) => {
            if (event.key === key && keyPressed) {
                setKeyPressed(false);
            }
        },
        window,
        true
    );

    useEffect(() => {
        if (keyPressed) {
            savedHandler();
        }
    }, [keyPressed]);
}
