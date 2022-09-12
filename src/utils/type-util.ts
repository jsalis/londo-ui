/**
 * Returns whether a value is null.
 */
export function isNull(val: any): val is null {
    return val === null;
}

/**
 * Returns whether a value is defined.
 */
export function isDefined(val: any) {
    return val !== undefined;
}

/**
 * Returns whether a value is undefined.
 */
export function isUndefined(val: any): val is undefined {
    return val === undefined;
}

/**
 * Returns whether a value is an object and not null.
 */
export function isObjectLike(val: any): val is object {
    return typeof val === "object" && val !== null;
}

/**
 * Returns whether a value is a plain object.
 */
export function isPlainObject(val: any) {
    return isObjectLike(val) && Object.prototype.toString.call(val) === "[object Object]";
}

/**
 * Returns whether a value is a function.
 */
export function isFunction<T extends Function = Function>(val: any): val is T {
    return typeof val === "function";
}

/**
 * Returns whether a value is a boolean.
 */
export function isBoolean(val: any): val is boolean {
    return typeof val === "boolean";
}

/**
 * Returns whether a value is a number.
 */
export function isNumber(val: any): val is number {
    return typeof val === "number";
}

/**
 * Returns whether a value is a string.
 */
export function isString(val: any): val is string {
    return typeof val === "string";
}

/**
 * Returns whether a value is an empty string.
 */
export function isEmptyString(val: any): val is string {
    return isString(val) && val.length === 0;
}

/**
 * Returns whether a value is a non-empty string.
 */
export function isNonEmptyString(val: any): val is string {
    return isString(val) && val.length !== 0;
}
