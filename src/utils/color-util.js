import { round } from "./math-util";

const HEX_COLOR_REGEX = /^#?([0-9A-F]{3,8})$/i;

export function isValidColorHex(value, alpha) {
    const match = HEX_COLOR_REGEX.exec(value);
    const length = match ? match[1].length : 0;

    // "#rrggbb" format or "#rrggbbaa" format
    return length === 6 || (!!alpha && length === 8);
}

export function equalColorHex(first, second) {
    return first.toLowerCase() === second.toLowerCase();
}

export function hexToRgba(hex) {
    if (hex[0] === "#") {
        hex = hex.substr(1);
    }

    if (hex.length < 6) {
        return {
            r: parseInt(hex[0] + hex[0], 16),
            g: parseInt(hex[1] + hex[1], 16),
            b: parseInt(hex[2] + hex[2], 16),
            a: 1,
        };
    }

    return {
        r: parseInt(hex.substr(0, 2), 16),
        g: parseInt(hex.substr(2, 2), 16),
        b: parseInt(hex.substr(4, 2), 16),
        a: 1,
    };
}

export function rgbaToHsva({ r, g, b, a }) {
    const max = Math.max(r, g, b);
    const delta = max - Math.min(r, g, b);

    // prettier-ignore
    const hh = delta
        ? max === r
            ? (g - b) / delta
            : max === g
                ? 2 + (b - r) / delta
                : 4 + (r - g) / delta
        : 0;

    return {
        h: round(60 * (hh < 0 ? hh + 6 : hh)),
        s: round(max ? (delta / max) * 100 : 0),
        v: round((max / 255) * 100),
        a,
    };
}

export function hsvaToRgba({ h, s, v, a }) {
    h = (h / 360) * 6;
    s = s / 100;
    v = v / 100;

    const hh = Math.floor(h);
    const b = v * (1 - s);
    const c = v * (1 - (h - hh) * s);
    const d = v * (1 - (1 - h + hh) * s);
    const mod = hh % 6;

    return {
        r: round([v, c, b, b, d, v][mod] * 255),
        g: round([d, v, v, c, b, b][mod] * 255),
        b: round([b, b, d, v, v, c][mod] * 255),
        a: round(a, 2),
    };
}

function formatToHex(n) {
    const hex = n.toString(16);
    return hex.length < 2 ? "0" + hex : hex;
}

export function rgbaToHex({ r, g, b }) {
    return "#" + formatToHex(r) + formatToHex(g) + formatToHex(b);
}

export function hsvaToHsla({ h, s, v, a }) {
    const hh = ((200 - s) * v) / 100;
    return {
        h: round(h),
        s: round(hh > 0 && hh < 200 ? ((s * v) / 100 / (hh <= 100 ? hh : 200 - hh)) * 100 : 0),
        l: round(hh / 2),
        a: round(a, 2),
    };
}

export function hsvaToHslString(hsva) {
    const { h, s, l } = hsvaToHsla(hsva);
    return `hsl(${h}, ${s}%, ${l}%)`;
}

export function hexToHsva(hex) {
    return rgbaToHsva(hexToRgba(hex));
}

export function hsvaToHex(hsva) {
    return rgbaToHex(hsvaToRgba(hsva));
}
