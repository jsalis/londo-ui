import { useState } from "react";

import { isDefined } from "../utils/type-util";

import { useCallbackRef } from "./use-callback-ref";

/**
 * Uses state that can operate in controlled and uncontrolled modes.
 */
export function useControllableState<S>(value?: S, initialState?: S | (() => S)) {
    const [state, setState] = useState(initialState);
    const effectiveValue = isDefined(value) ? value : state;

    const setValue = useCallbackRef((val: React.SetStateAction<S | undefined>) => {
        if (!isDefined(value)) {
            setState(val);
        }
    });

    return [effectiveValue, setValue] as const;
}
