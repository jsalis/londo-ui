import { useRef } from "react";

const none = {};

/**
 * Uses a ref with lazy initialization.
 */
export function useLazyRef<T>(init: () => T) {
    const ref: React.MutableRefObject<T> = useRef(none as any);
    if (ref.current === none) {
        ref.current = init();
    }
    return ref;
}
