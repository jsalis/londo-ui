import { useState, useCallback } from "react";
import copyToClipboard from "copy-to-clipboard";

import { useTimeout } from "./use-timeout";

/**
 * Copies text to the clipboard.
 */
export function useClipboard(value: string, timeout = 3000) {
    const [hasCopied, setHasCopied] = useState(false);

    const copy = useCallback(() => {
        const didCopy = copyToClipboard(value);
        setHasCopied(didCopy);
    }, [value]);

    useTimeout(() => setHasCopied(false), hasCopied ? timeout : null);

    return { value, copy, hasCopied };
}
