import { hexToHsva, hsvaToHex, equalColorHex } from "../utils/color-util";

import { useColorManipulation } from "./use-color-manipulation";

const colorModel = {
    toHsva: hexToHsva,
    fromHsva: hsvaToHex,
    equal: equalColorHex,
};

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
 * @param   {*}        color
 * @param   {Function} onChange
 * @returns {[HsvaColor, Function]}
 */
export function useHexColor(color, onChange) {
    return useColorManipulation(colorModel, color, onChange);
}
