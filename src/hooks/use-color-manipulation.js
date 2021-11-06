import { useState, useEffect, useRef } from "react";

import { useCallbackRef } from "./use-callback-ref";

/**
 * @typedef  ColorModel
 * @type     {Object}
 * @property {Function} toHsva
 * @property {Function} fromHsva
 * @property {Function} equal
 */

/**
 * @typedef  HsvaColor
 * @type     {Object}
 * @property {Number} h
 * @property {Number} s
 * @property {Number} v
 * @property {Number} a
 */

/**
 * Uses color manipulation in HSVA format. Can be applied to any incoming color format by specifying the color model.
 *
 * @param   {ColorModel} colorModel
 * @param   {*}          color
 * @param   {Function}   onChange
 * @returns {[HsvaColor, Function]}
 */
export function useColorManipulation(colorModel, color, onChange) {
    const [hsva, setHsva] = useState(() => colorModel.toHsva(color));
    const cache = useRef({ color, hsva });
    const onChangeCallback = useCallbackRef(onChange);

    useEffect(() => {
        if (!colorModel.equal(color, cache.current.color)) {
            const newHsva = colorModel.toHsva(color);
            cache.current = { color, hsva: newHsva };
            setHsva(newHsva);
        }
    }, [color, colorModel]);

    useEffect(() => {
        if (!equalColorObjects(hsva, cache.current.hsva)) {
            const newColor = colorModel.fromHsva(hsva);

            if (!colorModel.equal(newColor, cache.current.color)) {
                // cache new color to prevent unnecessary updates
                cache.current = { hsva, color: newColor };
                onChangeCallback(newColor);
            }
        }
    }, [hsva, colorModel]);

    const updateHsva = useCallbackRef((params) => {
        setHsva((current) => ({ ...current, ...params }));
    });

    return [hsva, updateHsva];
}

function equalColorObjects(first, second) {
    if (first === second) {
        return true;
    }

    for (const prop in first) {
        if (first[prop] !== second[prop]) {
            return false;
        }
    }

    return true;
}
