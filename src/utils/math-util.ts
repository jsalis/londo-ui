/**
 * Clamps a value between a minimum and maximum.
 */
export function clamp(value: number, min = 0, max = 1) {
    return value < min ? min : value > max ? max : value;
}

/**
 * Rounds a value to a given number of digits.
 */
export function round(number: number, digits = 0, base = 10 ** digits) {
    return Math.round(number * base) / base;
}
