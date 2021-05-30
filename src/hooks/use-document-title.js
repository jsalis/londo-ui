import { useRef, useEffect } from "react";

import { isNonEmptyString } from "../utils/type-util";

const defaultOptions = {
    restoreOnUnmount: true,
};

/**
 * Sets the document title.
 *
 * @param {String}  title
 * @param {Object}  options
 * @param {Boolean} options.restoreOnUnmount
 */
export function useDocumentTitle(title, options = defaultOptions) {
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
    }, []);
}
