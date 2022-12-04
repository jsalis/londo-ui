import { hexToRgba, rgbaToHex, hexToHsva, hsvaToHex } from "../utils/color-util";

type ColorPalette = string[] & {
    light: string;
    base: string;
    hover: string;
    active: string;
};

const hueStep = 2;
const saturationStep = 16;
const saturationStep2 = 5;
const brightnessStep1 = 5;
const brightnessStep2 = 15;
const lightColorCount = 5;
const darkColorCount = 4;

function mix(color1: string, color2: string, amount: number): string {
    const p = amount / 100;
    const rgb1 = hexToRgba(color1);
    const rgb2 = hexToRgba(color2);
    const hex = rgbaToHex({
        r: (rgb2.r - rgb1.r) * p + rgb1.r,
        g: (rgb2.g - rgb1.g) * p + rgb1.g,
        b: (rgb2.b - rgb1.b) * p + rgb1.b,
        a: 1,
    });

    return hex.toUpperCase();
}

function getHue(hsv: any, i: number, isLight: boolean) {
    let hue;

    if (hsv.h >= 60 && hsv.h <= 240) {
        hue = isLight ? hsv.h - hueStep * i : hsv.h + hueStep * i;
    } else {
        hue = isLight ? hsv.h + hueStep * i : hsv.h - hueStep * i;
    }

    if (hue < 0) {
        hue += 360;
    } else if (hue >= 360) {
        hue -= 360;
    }

    return Math.round(hue);
}

function getSaturation(hsv: any, i: number, isLight: boolean) {
    let saturation;

    if (isLight) {
        saturation = hsv.s - saturationStep * i;
    } else if (i === darkColorCount) {
        saturation = hsv.s + saturationStep;
    } else {
        saturation = hsv.s + saturationStep2 * i;
    }

    if (saturation > 100) {
        saturation = 100;
    }

    if (isLight && i === lightColorCount && saturation > 10) {
        saturation = 10;
    }

    if (saturation < 6) {
        saturation = 6;
    }

    return Math.round(saturation);
}

function getValue(hsv: any, i: number, isLight: boolean) {
    let value;

    if (isLight) {
        value = hsv.v + brightnessStep1 * i;
    } else {
        value = hsv.v - brightnessStep2 * i;
    }

    if (value > 100) {
        value = 100;
    }

    return value;
}

function sampleColor(color: string, index: number) {
    const isLight = index <= 6;
    const hsv = hexToHsva(color);
    const i = isLight ? lightColorCount + 1 - index : index - lightColorCount - 1;
    const hex = hsvaToHex({
        h: getHue(hsv, i, isLight),
        s: getSaturation(hsv, i, isLight),
        v: getValue(hsv, i, isLight),
        a: 1,
    });

    return hex.toUpperCase();
}

export function colorPaletteLight(baseColor: string) {
    const palette = [
        sampleColor(baseColor, 2),
        sampleColor(baseColor, 3),
        sampleColor(baseColor, 4),
        sampleColor(baseColor, 5),
        baseColor,
        sampleColor(baseColor, 7),
        sampleColor(baseColor, 8),
        sampleColor(baseColor, 9),
        sampleColor(baseColor, 10),
        sampleColor(baseColor, 11),
    ] as ColorPalette;

    palette.light = sampleColor(baseColor, 1);
    palette.base = palette[4];
    palette.hover = palette[3];
    palette.active = palette[5];
    return palette;
}

export function colorPaletteDark(baseColor: string, bgColor: string) {
    const palette = [
        mix(sampleColor(baseColor, 8), bgColor, 80),
        mix(sampleColor(baseColor, 7), bgColor, 70),
        mix(baseColor, bgColor, 65),
        mix(baseColor, bgColor, 50),
        mix(baseColor, bgColor, 30),
        mix(baseColor, bgColor, 10),
        mix(sampleColor(baseColor, 5), bgColor, 10),
        mix(sampleColor(baseColor, 4), bgColor, 5),
        mix(sampleColor(baseColor, 3), bgColor, 4),
        mix(sampleColor(baseColor, 2), bgColor, 3),
    ] as ColorPalette;

    palette.light = palette[0];
    palette.base = palette[5];
    palette.hover = palette[4];
    palette.active = palette[6];
    return palette;
}
