import { useRef, useEffect } from "react";

import { isNonEmptyString } from "../utils/type-util";

const defaultOptions = {
    restoreOnUnmount: true,
};

/**
 * Sets the document title.
 */
export function useDocumentTitle(title: string, options = defaultOptions) {
    const prevTitle = useRef(document.title);

    if (isNonEmptyString(title)) {
        document.title = title;
    }

    useEffect(() => {
        if (options?.restoreOnUnmount) {
            return () => {
                document.title = prevTitle.current;
            };
        }
        return;
    }, []);
}
