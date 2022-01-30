import { useState } from "react";

import { isDefined } from "../utils/type-util";

import { useCallbackRef } from "./use-callback-ref";

/**
 * Uses state that can operate in controlled and uncontrolled modes.
 */
export function useControllableState<S>(
    value?: S,
    initialState?: S | (() => S)
): [S | undefined, React.Dispatch<React.SetStateAction<S>>] {
    const [state, setState] = useState(initialState);
    const effectiveValue = isDefined(value) ? value : state;

    const setValue = useCallbackRef((val) => {
        if (!isDefined(value)) {
            setState(val);
        }
    });

    return [effectiveValue, setValue];
}
