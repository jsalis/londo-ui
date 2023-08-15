import { useEffect } from "react";

import { useCallbackRef } from "./use-callback-ref";

/**
 * Uses a timeout.
 */
export function useTimeout(callback: () => void, delay: number | null) {
    const savedCallback = useCallbackRef(callback);

    useEffect(() => {
        if (delay !== null) {
            const id = setTimeout(() => savedCallback(), delay);
            return () => clearTimeout(id);
        }
        return;
    }, [delay]);
}
