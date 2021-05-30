import { colorPaletteLight } from "./color-palette";
import { base } from "./base";

const alpha = [
    "rgba(0, 0, 0, 0.05)",
    "rgba(0, 0, 0, 0.15)",
    "rgba(0, 0, 0, 0.25)",
    "rgba(0, 0, 0, 0.35)",
    "rgba(0, 0, 0, 0.45)",
    "rgba(0, 0, 0, 0.55)",
    "rgba(0, 0, 0, 0.65)",
    "rgba(0, 0, 0, 0.75)",
    "rgba(0, 0, 0, 0.85)",
    "rgba(0, 0, 0, 0.95)",
];

alpha.inverse = [
    "rgba(255, 255, 255, 0.05)",
    "rgba(255, 255, 255, 0.15)",
    "rgba(255, 255, 255, 0.25)",
    "rgba(255, 255, 255, 0.35)",
    "rgba(255, 255, 255, 0.45)",
    "rgba(255, 255, 255, 0.55)",
    "rgba(255, 255, 255, 0.65)",
    "rgba(255, 255, 255, 0.75)",
    "rgba(255, 255, 255, 0.85)",
    "rgba(255, 255, 255, 0.95)",
];

const gray = [
    "#FFFFFF",
    "#FAFAFA",
    "#F5F5F5",
    "#F0F0F0",
    "#D9D9D9",
    "#BFBFBF",
    "#8C8C8C",
    "#595959",
    "#434343",
    "#262626",
];
gray.light = gray[5];
gray.base = gray[6];

const magenta = colorPaletteLight("#EB2F96");
const red = colorPaletteLight("#F5222D");
const volcano = colorPaletteLight("#FA541D");
const orange = colorPaletteLight("#FA8C16");
const gold = colorPaletteLight("#FAAD14");
const yellow = colorPaletteLight("#FADB14");
const lime = colorPaletteLight("#A0D911");
const green = colorPaletteLight("#52C41A");
const cyan = colorPaletteLight("#27C8C5");
const blue = colorPaletteLight("#1890FF");
const geekblue = colorPaletteLight("#2F54EB");
const purple = colorPaletteLight("#722ED1");

const colors = {
    alpha,
    gray,
    magenta,
    red,
    volcano,
    orange,
    gold,
    yellow,
    lime,
    green,
    cyan,
    blue,
    geekblue,
    purple,
    primary: orange,
    positive: green,
    negative: red,
    warning: yellow,
    info: blue,
    heading: alpha[8],
    text: alpha[6],
    placeholder: alpha[3],
    disabled: alpha[2],
    bg: {
        base: gray[2],
        body: gray[0],
    },
    border: {
        base: gray[4],
        split: gray[3],
        grid: gray[2],
    },
    shadow: {
        base: alpha[1],
        inverse: alpha.inverse[1],
    },
    popover: {
        bg: gray[0],
    },
    tooltip: {
        bg: alpha[9],
        text: gray[0],
    },
};

const borders = {
    base: `1px solid ${colors.border.base}`,
    split: `1px solid ${colors.border.split}`,
    grid: `1px solid ${colors.border.grid}`,
};

const shadows = {
    base: "0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)",
    up: "0 -6px 16px -8px rgba(0, 0, 0, 0.08), 0 -9px 28px 0 rgba(0, 0, 0, 0.05), 0 -12px 48px 16px rgba(0, 0, 0, 0.03)",
    down: "0 6px 16px -8px rgba(0, 0, 0, 0.08), 0 9px 28px 0 rgba(0, 0, 0, 0.05), 0 12px 48px 16px rgba(0, 0, 0, 0.03)",
    left: "-6px 0 16px -8px rgba(0, 0, 0, 0.08), -9px 0 28px 0 rgba(0, 0, 0, 0.05), -12px 0 48px 16px rgba(0, 0, 0, 0.03)",
    right: "6px 0 16px -8px rgba(0, 0, 0, 0.08), 9px 0 28px 0 rgba(0, 0, 0, 0.05), 12px 0 48px 16px rgba(0, 0, 0, 0.03)",
    cell: `0 0 0 4px ${alpha[5]}`,
};

export const light = {
    ...base,
    name: "light",
    colors,
    borders,
    shadows,
};