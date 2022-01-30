import { useEffect } from "react";

import { useCallbackRef } from "./use-callback-ref";

/**
 * Uses an event listener.
 */
export function useEventListener(
    eventType: string,
    callback: EventListener,
    el: EventTarget = document,
    options?: EventListenerOptions | boolean
) {
    const savedCallback = useCallbackRef(callback);

    useEffect(() => {
        const listener = (event: Event) => savedCallback(event);
        el?.addEventListener(eventType, listener, options);
        return () => el?.removeEventListener(eventType, listener, options);
    }, [eventType, el, options]);
}
