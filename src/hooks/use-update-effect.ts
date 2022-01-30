import { useRef, useEffect } from "react";

/**
 * Uses an effect that skips the first mount and only runs on update.
 */
export function useUpdateEffect(effect: React.EffectCallback, deps?: React.DependencyList) {
    const isMounted = useRef(false);

    useEffect(() => {
        if (isMounted.current) {
            return effect();
        } else {
            isMounted.current = true;
        }
    }, deps);
}
