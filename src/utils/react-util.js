import { Children, isValidElement } from "react";

import { isFunction } from "./type-util";

/**
 * Gets only the valid children of a component
 * and ignores any nullish or falsy child.
 *
 * @param   {React.ReactNode} children
 * @returns {React.ReactElement[]}
 */
export function getValidChildren(children) {
    return Children.toArray(children).filter((el) => isValidElement(el));
}

/**
 * Assigns a value to a ref.
 *
 * @param {Function || Object} ref
 * @param {Object}             value
 */
export function assignRef(ref, value) {
    if (isFunction(ref)) {
        ref(value);
    } else if (ref) {
        ref.current = value;
    }
}
