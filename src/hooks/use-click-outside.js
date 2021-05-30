import { useRef } from "react";

import { useCallbackRef } from "./use-callback-ref";
import { useEventListener } from "./use-event-listener";

/**
 * Uses an click event listener that is only called when the click is outside a container.
 *
 * NOTE: This implementation works with React portals.
 *
 * @param   {Function} handler
 * @returns {{ onClickCapture: Function }}
 */
export function useClickOutside(handler) {
    const savedHandler = useCallbackRef(handler);
    const isClickInside = useRef(false);
    const onClickCapture = () => {
        isClickInside.current = true;
    };

    useEventListener("click", (event) => {
        if (isClickInside.current) {
            isClickInside.current = false;
        } else {
            savedHandler(event);
        }
    });

    return { onClickCapture };
}
