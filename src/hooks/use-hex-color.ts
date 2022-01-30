import { hexToHsva, hsvaToHex, equalColorHex } from "../utils/color-util";

import { useColorManipulation } from "./use-color-manipulation";

const colorModel = {
    toHsva: hexToHsva,
    fromHsva: hsvaToHex,
    equal: equalColorHex,
};

/**
 * Uses color manipulation in HSVA format. Can be applied to any incoming color format by specifying the color model.
 */
export function useHexColor(color: any, onChange: (color: any) => void) {
    return useColorManipulation(colorModel, color, onChange);
}
