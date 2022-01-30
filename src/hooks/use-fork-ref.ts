import { useMemo } from "react";

import { assignRef } from "../utils/react-util";

type ReactRef<T> = React.Ref<T> | React.RefObject<T> | React.MutableRefObject<T>;

/**
 * Merges multiple refs into a single ref. This will create a new function if the ref props change
 * and are defined. This means react will call the old forkRef with `null` and the new forkRef
 * with the ref. Cleanup naturally emerges from this behavior.
 */
export function useForkRef<T>(...refs: ReactRef<T>[]) {
    return useMemo(() => {
        if (refs.every((ref) => !ref)) {
            return null;
        }
        return (val: T) => {
            refs.forEach((ref) => assignRef(ref, val));
        };
    }, refs);
}
