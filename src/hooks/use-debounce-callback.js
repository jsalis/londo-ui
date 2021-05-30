import { useRef, useEffect, useCallback } from "react";

import { useCallbackRef } from "./use-callback-ref";

/**
 * Uses a debounced function that delays invoking the callback until after `wait` milliseconds have elapsed since the
 * last time the debounced function was invoked.
 *
 * @param   {Function} callback
 * @param   {Number}   wait
 * @param   {Boolean}  [leading]
 * @returns {Function}
 */
export function useDebounceCallback(callback, wait, leading = false) {
    const timeout = useRef(null);
    const savedCallback = useCallbackRef(callback);

    useEffect(() => {
        clearTimeout(timeout.current);
        timeout.current = null;
    }, [wait, leading]);

    return useCallback(
        (...args) => {
            if (timeout.current === null && leading) {
                savedCallback(...args);
            }

            clearTimeout(timeout.current);
            timeout.current = setTimeout(() => {
                timeout.current = null;
                if (!leading) {
                    savedCallback(...args);
                }
            }, wait);
        },
        [wait, leading]
    );
}
