import { Children, isValidElement } from "react";

import { isFunction } from "./type-util";

type ReactRef<T> = React.Ref<T> | React.RefObject<T> | React.MutableRefObject<T>;

/**
 * Assigns a value to a ref function or object.
 */
export function assignRef<T = any>(ref: ReactRef<T> | undefined, value: T) {
    if (isFunction(ref)) {
        ref(value);
    } else if (ref) {
        // @ts-ignore
        ref.current = value;
    }
}

/**
 * Gets the valid children of a component and ignores any nullish or falsy child.
 */
export function getValidChildren(children: React.ReactNode | React.ReactNode[]) {
    return Children.toArray(children).filter((el) => isValidElement(el));
}
