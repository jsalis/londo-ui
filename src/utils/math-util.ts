/**
 * Clamps a value between a minimum and maximum.
 */
export function clamp(val: number, min = 0, max = 1) {
    return val < min ? min : val > max ? max : val;
}

/**
 * Rounds a value to a given number of digits.
 */
export function round(val: number, digits = 0, base = 10 ** digits) {
    return Math.round((val + Number.EPSILON) * base) / base;
}
