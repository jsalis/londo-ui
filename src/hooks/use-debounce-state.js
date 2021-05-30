import { useState, useEffect } from "react";

import { useDebounceCallback } from "./use-debounce-callback";

/**
 * Uses debounced state that delays invoking the change handler until after `wait` milliseconds have elapsed since the
 * last time the setter function was invoked.
 *
 * @param   {*}        value
 * @param   {Function} onChange
 * @param   {Number}   wait
 * @param   {Boolean}  [leading]
 * @returns {[*, Function]}
 */
export function useDebounceState(value, onChange, wait, leading) {
    const [currentValue, setCurrentValue] = useState(value);
    const onChangeDebounce = useDebounceCallback(onChange, wait, leading);
    const setValue = (value) => {
        setCurrentValue(value);
        onChangeDebounce(value);
    };

    useEffect(() => setCurrentValue(value), [value]);

    return [currentValue, setValue];
}
