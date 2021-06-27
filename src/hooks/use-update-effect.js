import { useRef, useEffect } from "react";

/**
 * Uses an effect that skips the first mount and only runs on update.
 *
 * @param {Function} effect
 * @param {Array}    [deps]
 */
export function useUpdateEffect(effect, deps) {
    const isMounted = useRef(false);

    useEffect(() => {
        if (isMounted.current) {
            return effect();
        } else {
            isMounted.current = true;
        }
    }, deps);
}
