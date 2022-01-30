import { useState, useEffect } from "react";

import { useCallbackRef } from "./use-callback-ref";

import { isDefined, isNumber } from "../utils/type-util";
import { round, clamp as clampValue } from "../utils/math-util";

type CounterOptions = {
    value?: any;
    defaultValue?: any;
    onChange?: (val: number, valStr: string) => void;
    min?: number;
    max?: number;
    step?: number;
    precision?: number;
};

/**
 * Uses a numeric counter.
 */
export function useCounter(options: CounterOptions = {}) {
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

    const update = useCallbackRef((val) => {
        const valStr = val.toString();
        if (value !== valStr) {
            setValue(valStr);
            onChange?.(parseValue(val), valStr);
        }
    });

    const clamp = useCallbackRef((val) => {
        const next = clampValue(val, min, max);
        return toPrecision(next, precision);
    });

    const increment = useCallbackRef((step: number = stepProp) => {
        const next = value === "" ? parseValue(step) : parseValue(value) + step;
        update(clamp(next));
    });

    const decrement = useCallbackRef((step: number = stepProp) => {
        const next = value === "" ? parseValue(-step) : parseValue(value) - step;
        update(clamp(next));
    });

    const cast = useCallbackRef((val) => {
        const next = castValue(val, precision);
        update(clamp(next));
    });

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

function isValidNumber(val: any): val is number {
    return isNumber(val) && !Number.isNaN(val) && Number.isFinite(val);
}

function toNumber(val: any) {
    const n = parseFloat(val);
    return isValidNumber(n) ? n : 0;
}

function toPrecision(val: any, precision = 10) {
    return round(toNumber(val), precision).toString();
}

function parseValue(val: any) {
    return toNumber(String(val).replace(/[^\w.-]+/g, ""));
}

function castValue(val: any, precision?: number) {
    return toPrecision(parseValue(val), precision);
}
