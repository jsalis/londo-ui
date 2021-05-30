/**
 * Returns whether a value is null.
 *
 * @param  {*} val
 * @return {Boolean}
 */
export function isNull(val) {
    return val === null;
}

/**
 * Returns whether a value is defined.
 *
 * @param  {*} val
 * @return {Boolean}
 */
export function isDefined(val) {
    return val !== undefined;
}

/**
 * Returns whether a value is undefined.
 *
 * @param  {*} val
 * @return {Boolean}
 */
export function isUndefined(val) {
    return val === undefined;
}

/**
 * Returns whether a value is an object and not null.
 *
 * @param  {*} val
 * @return {Boolean}
 */
export function isObjectLike(val) {
    return typeof val === "object" && val !== null;
}

/**
 * Returns whether a value is a plain object.
 *
 * @param  {*} val
 * @return {Boolean}
 */
export function isPlainObject(val) {
    return isObjectLike(val) && Object.prototype.toString.call(val) === "[object Object]";
}

/**
 * Returns whether a value is a function.
 *
 * @param  {*} val
 * @return {Boolean}
 */
export function isFunction(val) {
    return typeof val === "function";
}

/**
 * Returns whether a value is a boolean.
 *
 * @param  {*} val
 * @return {Boolean}
 */
export function isBoolean(val) {
    return typeof val === "boolean";
}

/**
 * Returns whether a value is a number.
 *
 * @param  {*} val
 * @return {Boolean}
 */
export function isNumber(val) {
    return typeof val === "number";
}

/**
 * Returns whether a value is a string.
 *
 * @param  {*} val
 * @return {Boolean}
 */
export function isString(val) {
    return typeof val === "string";
}

/**
 * Returns whether a value is an empty string.
 *
 * @param  {*} val
 * @return {Boolean}
 */
export function isEmptyString(val) {
    return isString(val) && val.length === 0;
}

/**
 * Returns whether a value is a non-empty string.
 *
 * @param  {*} val
 * @return {Boolean}
 */
export function isNonEmptyString(val) {
    return isString(val) && val.length !== 0;
}
