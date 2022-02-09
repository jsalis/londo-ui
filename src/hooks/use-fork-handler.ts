import { useCallback } from "react";

/**
 * Merges multiple event handlers into a single handler. Calling preventDefault() from any handler cancels the event,
 * meaning that execution of subsequent handlers will not occur.
 */
export function useForkHandler<E extends React.SyntheticEvent | Event>(
    ...fns: (((event: E) => void) | undefined)[]
) {
    return useCallback((event: E) => {
        fns.some((fn) => {
            fn?.(event);
            return event?.defaultPrevented;
        });
    }, fns);
}
