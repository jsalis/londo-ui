import { useEffect } from "react";

import { useCallbackRef } from "./use-callback-ref";

/**
 * Uses an event listener.
 *
 * @param {String}      event
 * @param {Function}    handler
 * @param {EventTarget} [el]
 * @param {Object}      [options]
 */
export function useEventListener(event, handler, el = document, options) {
    const savedHandler = useCallbackRef(handler);

    useEffect(() => {
        const listener = (event) => savedHandler(event);
        el?.addEventListener(event, listener, options);
        return () => el?.removeEventListener(event, listener, options);
    }, [event, el, options]);
}
