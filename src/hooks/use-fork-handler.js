import { useCallback } from "react";

/**
 * Merges multiple event handlers into a single handler. Calling preventDefault() from any handler cancels the event,
 * meaning that execution of subsequent handlers will not occur.
 *
 * @param   {...Function} fns
 * @returns {Function}
 */
export function useForkHandler(...fns) {
    return useCallback((event) => {
        fns.some((fn) => {
            fn?.(event);
            return event?.defaultPrevented;
        });
    }, fns);
}
