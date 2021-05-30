import { useState, useEffect, useCallback } from "react";

import { isDefined, isNumber } from "../utils/type-util";

/**
 * Uses a numeric counter.
 *
 * @param   {Object}   [options]
 * @param   {*}        [options.value]
 * @param   {*}        [options.defaultValue]
 * @param   {Function} [options.onChange]
 * @param   {Number}   [options.min]
 * @param   {Number}   [options.max]
 * @param   {Number}   [options.step]
 * @param   {Number}   [options.precision]
 * @returns {{
 *     value: *,
 *     valueAsNumber: number,
 *     update: function(*): void,
 *     increment: function(*): void,
 *     decrement: function(*): void,
 *     clamp: function(*): string,
 *     cast: function(*): void
 * }}
 */
export function useCounter(options = {}) {
    const {
        value: valueProp,
        defaultValue,
        onChange,
        min = Number.MIN_SAFE_INTEGER,
        max = Number.MAX_SAFE_INTEGER,
        step: stepProp = 1,
        precision,
    } = options;

    const [value, setValue] = useState(() => {
        return castValue(defaultValue, precision);
    });

    const valueAsNumber = parseValue(value);

    useEffect(() => {
        if (isDefined(valueProp) && parseValue(valueProp) !== valueAsNumber) {
            const next = castValue(valueProp, precision);
            setValue(next);
        }
    }, [valueProp, valueAsNumber, precision]);

    const update = useCallback(
        (val) => {
            setValue(val.toString());
            onChange?.(parseValue(val), val.toString());
        },
        [onChange]
    );

    const clamp = useCallback(
        (val) => {
            const next = clampValue(val, min, max);
            return toPrecision(next, precision);
        },
        [min, max, precision]
    );

    const increment = useCallback(
        (step = stepProp) => {
            const next = value === "" ? parseValue(step) : parseValue(value) + step;
            update(clamp(next));
        },
        [update, clamp, stepProp, value]
    );

    const decrement = useCallback(
        (step = stepProp) => {
            const next = value === "" ? parseValue(-step) : parseValue(value) - step;
            update(clamp(next));
        },
        [update, clamp, stepProp, value]
    );

    const cast = useCallback(
        (val) => {
            const next = castValue(val, precision);
            update(clamp(next));
        },
        [update, clamp, precision]
    );

    return {
        value,
        valueAsNumber,
        update,
        increment,
        decrement,
        clamp,
        cast,
    };
}

function isValidNumber(value) {
    return isNumber(value) && !Number.isNaN(value) && Number.isFinite(value);
}

function toNumber(value) {
    const num = parseFloat(value);
    return isValidNumber(num) ? num : 0;
}

function toPrecision(value, precision = 10) {
    const scale = 10 ** precision;
    const num = Math.round(toNumber(value) * scale) / scale;
    return String(num);
}

function parseValue(value) {
    return toNumber(String(value).replace(/[^\w.-]+/g, ""));
}

function castValue(value, precision) {
    return toPrecision(parseValue(value), precision);
}

function clampValue(value, min, max) {
    return value < min ? min : value > max ? max : value;
}