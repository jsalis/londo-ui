import { useState, useEffect } from "react";

import { useDebounceCallback } from "./use-debounce-callback";

/**
 * Uses debounced state that delays invoking the change handler until after `wait` milliseconds have elapsed since the
 * last time the setter function was invoked.
 */
export function useDebounceState<S>(
    value: S,
    onChange: (value: S) => void,
    wait: number,
    leading?: boolean,
) {
    const [currentValue, setCurrentValue] = useState(value);
    const onChangeDebounce = useDebounceCallback(onChange, wait, leading);
    const setValue = (value: S) => {
        setCurrentValue(value);
        onChangeDebounce(value);
    };

    useEffect(() => setCurrentValue(value), [value]);

    return [currentValue, setValue] as const;
}
