import { useRef, useEffect, useCallback } from "react";

import { useCallbackRef } from "./use-callback-ref";

/**
 * Uses a debounced function that delays invoking the callback until after `wait` milliseconds have elapsed since the
 * last time the debounced function was invoked.
 */
export function useDebounceCallback<T extends (...args: any[]) => any>(
    callback: T,
    wait: number,
    leading = false,
) {
    const timeout = useRef<number | undefined>();
    const savedCallback = useCallbackRef(callback);

    useEffect(() => {
        window.clearTimeout(timeout.current);
        timeout.current = undefined;
    }, [wait, leading]);

    const fn = (...args: any[]) => {
        if (timeout.current === undefined && leading) {
            savedCallback(...args);
        }

        window.clearTimeout(timeout.current);
        timeout.current = window.setTimeout(() => {
            timeout.current = undefined;
            if (!leading) {
                savedCallback(...args);
            }
        }, wait);
    };

    return useCallback(fn as T, [wait, leading]);
}
