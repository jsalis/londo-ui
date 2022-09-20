const fonts = {
    brand: "Quantico, sans-serif",
    body: "Roboto Mono, Source Code Pro, Menlo, Courier, monospace",
};

type FontSizes = number[] & {
    sm: number;
    md: number;
    lg: number;
};

const fontSizes = [12, 14, 16, 20, 24, 32, 48, 64] as FontSizes;
fontSizes.sm = fontSizes[0];
fontSizes.md = fontSizes[1];
fontSizes.lg = fontSizes[2];

const lineHeights = {
    none: 1,
    shorter: 1.25,
    short: 1.375,
    base: 1.5,
    tall: 1.625,
    taller: 2,
};

type Space = number[] & {
    xs: number;
    sm: number;
    md: number;
    lg: number;
};

const space = [0, 4, 8, 16, 32, 64, 128, 256] as Space;
space.xs = space[1];
space.sm = space[2];
space.md = space[3];
space.lg = space[4];

type Breakpoints = string[] & {
    md: string;
    lg: string;
};

const breakpoints = ["768px", "1200px"] as Breakpoints;
breakpoints.md = breakpoints[0];
breakpoints.lg = breakpoints[1];

const mediaQueries = {
    md: `@media screen and (min-width: ${breakpoints.md})`,
    lg: `@media screen and (min-width: ${breakpoints.lg})`,
};

const radii = {
    base: 2,
};

const transitions = {
    easeBaseIn: "cubic-bezier(0.9, 0, 0.3, 0.7)",
    easeBaseOut: "cubic-bezier(0.7, 0.3, 0.1, 1)",
    easeIn: "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
    easeOut: "cubic-bezier(0.215, 0.61, 0.355, 1)",
    easeInOut: "cubic-bezier(0.645, 0.045, 0.355, 1)",
    easeInBack: "cubic-bezier(0.71, -0.46, 0.88, 0.6)",
    easeOutBack: "cubic-bezier(0.12, 0.4, 0.29, 1.46)",
    easeInOutBack: "cubic-bezier(0.71, -0.46, 0.29, 1.46)",
    easeInCircle: "cubic-bezier(0.6, 0.04, 0.98, 0.34)",
    easeOutCircle: "cubic-bezier(0.08, 0.82, 0.17, 1)",
    easeInOutCircle: "cubic-bezier(0.78, 0.14, 0.15, 0.86)",
    easeInQuint: "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
    easeOutQuint: "cubic-bezier(0.23, 1, 0.32, 1)",
    easeInOutQuint: "cubic-bezier(0.86, 0, 0.07, 1)",
};

const animationDurations = {
    slow: "0.3s",
    base: "0.2s",
    fast: "0.1s",
};

export const base = {
    fonts,
    fontSizes,
    lineHeights,
    space,
    breakpoints,
    mediaQueries,
    radii,
    transitions,
    animationDurations,
};
