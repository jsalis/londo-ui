import { useCallback } from "react";

/**
 * Merges multiple event handlers into a single handler.
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
