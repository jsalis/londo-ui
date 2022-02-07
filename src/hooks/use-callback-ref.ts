import { useRef, useLayoutEffect, useCallback } from "react";

/**
 * Persists a function between renders.
 */
export function useCallbackRef<T extends (...args: any[]) => any>(callback?: T) {
    const ref = useRef(callback);

    useLayoutEffect(() => {
        ref.current = callback;
    });

    const fn = (...args: any[]) => {
        return ref.current?.(...args);
    };

    return useCallback(fn as T, []);
}
