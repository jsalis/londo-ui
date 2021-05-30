import { useState, useCallback } from "react";

import { isDefined } from "../utils/type-util";

/**
 * Uses state that can operate in controlled and uncontrolled modes.
 *
 * @param   {*} value
 * @param   {*} [initialState]
 * @returns {[*, Function]}
 */
export function useControllableState(value, initialState) {
    const [state, setState] = useState(initialState);
    const effectiveValue = isDefined(value) ? value : state;
    const setValue = useCallback(
        (val) => {
            if (!isDefined(value)) {
                setState(val);
            }
        },
        [value]
    );

    return [effectiveValue, setValue];
}
