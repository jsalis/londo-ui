import { useState, useEffect, useRef } from "react";

import { useCallbackRef } from "./use-callback-ref";

type HsvaColor = { h: number; s: number; v: number; a: number };

type ColorModel = {
    toHsva: (color: any) => HsvaColor;
    fromHsva: (color: HsvaColor) => any;
    equal: (a: any, b: any) => boolean;
};

/**
 * Uses color manipulation in HSVA format. Can be applied to any incoming color format by specifying the color model.
 */
export function useColorManipulation(
    colorModel: ColorModel,
    color: any,
    onChange?: (color: any) => void,
) {
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

    const updateHsva = useCallbackRef((params: Partial<HsvaColor>) => {
        setHsva((current) => ({ ...current, ...params }));
    });

    return [hsva, updateHsva] as const;
}

function equalColorObjects(first: any, second: any) {
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
