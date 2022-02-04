import { useState } from "react";

import { isUndefined } from "../utils/type-util";

import { useCallbackRef } from "./use-callback-ref";

/**
 * Uses state that can operate in controlled and uncontrolled modes.
 */
export function useControllableState<S>(value: S | undefined, initialState: S | (() => S)) {
    const [state, setState] = useState(initialState);
    const effectiveValue = isUndefined(value) ? state : value;

    const setValue = useCallbackRef((val: React.SetStateAction<S>) => {
        if (isUndefined(value)) {
            setState(val);
        }
    });

    return [effectiveValue, setValue] as const;
}
