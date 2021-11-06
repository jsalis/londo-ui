/**
 * Clamps a value between a minimum and maximum.
 *
 * @param   {Number} val
 * @param   {Number} [min]
 * @param   {Number} [max]
 * @returns {Number}
 */
export function clamp(value, min = 0, max = 1) {
    return value < min ? min : value > max ? max : value;
}

/**
 * Rounds a value to a given number of digits.
 *
 * @param   {Number} number
 * @param   {Number} [digits]
 * @param   {Number} [base]
 * @returns {Number}
 */
export function round(number, digits = 0, base = 10 ** digits) {
    return Math.round(number * base) / base;
}
