import { colorPaletteDark } from "./color-palette";
import { base } from "./base";

const alpha = [
    "rgba(255, 255, 255, 0.04)",
    "rgba(255, 255, 255, 0.06)",
    "rgba(255, 255, 255, 0.08)",
    "rgba(255, 255, 255, 0.16)",
    "rgba(255, 255, 255, 0.24)",
    "rgba(255, 255, 255, 0.36)",
    "rgba(255, 255, 255, 0.48)",
    "rgba(255, 255, 255, 0.64)",
    "rgba(255, 255, 255, 0.80)",
    "rgba(255, 255, 255, 0.92)",
];

alpha.inverse = [
    "rgba(0, 0, 0, 0.04)",
    "rgba(0, 0, 0, 0.06)",
    "rgba(0, 0, 0, 0.08)",
    "rgba(0, 0, 0, 0.16)",
    "rgba(0, 0, 0, 0.24)",
    "rgba(0, 0, 0, 0.36)",
    "rgba(0, 0, 0, 0.48)",
    "rgba(0, 0, 0, 0.64)",
    "rgba(0, 0, 0, 0.80)",
    "rgba(0, 0, 0, 0.92)",
];

alpha.white = alpha;
alpha.black = alpha.inverse;

const gray = [
    "#14141C",
    "#191921",
    "#1E1E26",
    "#23232B",
    "#3A3A42",
    "#54545C",
    "#87878F",
    "#BABAC2",
    "#D0D0D8",
    "#EDEDF5",
];
gray.light = gray[5];
gray.base = gray[6];

const magenta = colorPaletteDark("#EB2F96", gray[0]);
const red = colorPaletteDark("#F5222D", gray[0]);
const volcano = colorPaletteDark("#FA541D", gray[0]);
const orange = colorPaletteDark("#FA8C16", gray[0]);
const gold = colorPaletteDark("#FAAD14", gray[0]);
const yellow = colorPaletteDark("#FADB14", gray[0]);
const lime = colorPaletteDark("#A0D911", gray[0]);
const green = colorPaletteDark("#52C41A", gray[0]);
const cyan = colorPaletteDark("#27C8C5", gray[0]);
const blue = colorPaletteDark("#1890FF", gray[0]);
const geekblue = colorPaletteDark("#2F54EB", gray[0]);
const purple = colorPaletteDark("#722ED1", gray[0]);

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
    text: alpha[7],
    placeholder: alpha[5],
    disabled: alpha[4],
    bg: {
        base: gray[2],
        body: gray[0],
    },
    border: {
        base: gray[4],
        split: alpha[0],
        grid: gray[2],
    },
    shadow: {
        base: alpha.inverse[6],
        inverse: alpha[6],
    },
    modal: {
        bg: gray[1],
    },
    popover: {
        bg: gray[1],
    },
    tooltip: {
        bg: gray[4],
        text: gray[9],
    },
};

const borders = {
    base: `1px solid ${colors.border.base}`,
    split: `1px solid ${colors.border.split}`,
    grid: `1px solid ${colors.border.grid}`,
};

const shadows = {
    base: "0 3px 6px -4px rgba(0, 0, 0, 0.48), 0 6px 16px 0 rgba(0, 0, 0, 0.32), 0 9px 28px 8px rgba(0, 0, 0, 0.2)",
    up: "0 -6px 16px -8px rgba(0, 0, 0, 0.32), 0 -9px 28px 0 rgba(0, 0, 0, 0.2), 0 -12px 48px 16px rgba(0, 0, 0, 0.12)",
    down: "0 6px 16px -8px rgba(0, 0, 0, 0.32), 0 9px 28px 0 rgba(0, 0, 0, 0.2), 0 12px 48px 16px rgba(0, 0, 0, 0.12)",
    left: "-6px 0 16px -8px rgba(0, 0, 0, 0.32), -9px 0 28px 0 rgba(0, 0, 0, 0.2), -12px 0 48px 16px rgba(0, 0, 0, 0.12)",
    right: "6px 0 16px -8px rgba(0, 0, 0, 0.32), 9px 0 28px 0 rgba(0, 0, 0, 0.2), 12px 0 48px 16px rgba(0, 0, 0, 0.12)",
    cell: `0 0 0 4px ${alpha[6]}`,
};

export const dark = {
    ...base,
    name: "dark",
    colors,
    borders,
    shadows,
};
