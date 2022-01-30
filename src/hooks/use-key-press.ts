import { useState, useEffect } from "react";

import { useCallbackRef } from "./use-callback-ref";
import { useEventListener } from "./use-event-listener";

/**
 * Uses a key press event.
 */
export function useKeyPress(key: string, callback: () => void) {
    const savedCallback = useCallbackRef(callback);
    const [keyPressed, setKeyPressed] = useState(false);

    useEventListener(
        "keydown",
        (event) => {
            if ((event as KeyboardEvent).key === key && !keyPressed) {
                setKeyPressed(true);
            }
        },
        window,
        true
    );

    useEventListener(
        "keyup",
        (event) => {
            if ((event as KeyboardEvent).key === key && keyPressed) {
                setKeyPressed(false);
            }
        },
        window,
        true
    );

    useEffect(() => {
        if (keyPressed) {
            savedCallback();
        }
    }, [keyPressed]);
}
