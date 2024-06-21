import { withThemeFromJSXProvider } from "@storybook/addon-themes";

import { ResetStyle, ThemeProvider, themes } from "../src";

import { storybookTheme } from "./theme";

export const tags = ["autodocs"];

export const decorators = [
    withThemeFromJSXProvider({
        themes: {
            dark: themes.dark.name,
            light: themes.light.name,
        },
        defaultTheme: themes.dark.name,
        Provider: ThemeProvider,
        GlobalStyles: ResetStyle,
    }),
];

export const parameters = {
    docs: {
        theme: storybookTheme,
    },
    backgrounds: {
        disable: true,
    },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};
