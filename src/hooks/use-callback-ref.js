import { useRef, useLayoutEffect, useCallback } from "react";

/**
 * Persists a function between renders.
 *
 * @param   {Function} callback
 * @returns {Function}
 */
export function useCallbackRef(callback) {
    const ref = useRef(callback);

    useLayoutEffect(() => {
        ref.current = callback;
    });

    return useCallback((...args) => {
        return ref.current?.(...args);
    }, []);
}
