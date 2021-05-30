import { create } from "@storybook/theming";

import { themes } from "../src/themes";

const { colors } = themes.dark;

export const storybookTheme = create({
    base: "dark",
    brandTitle: "Londo UI",
    colorPrimary: colors.primary.base,
    colorSecondary: colors.primary.base,
    appBg: colors.bg.base,
    appContentBg: colors.bg.body,
    barBg: colors.bg.body,
    inputBg: colors.bg.body,
});
