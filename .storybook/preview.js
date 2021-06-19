import { createGlobalStyle } from "styled-components";
import { withThemesProvider } from "storybook-addon-styled-component-theme";

import { ThemeProvider, themes, reset } from "../src";

import { storybookTheme } from "./theme";

const GlobalStyle = createGlobalStyle`${reset}`;

export const decorators = [
    (Story) => (
        <>
            <GlobalStyle />
            <Story />
        </>
    ),
    withThemesProvider([themes.dark, themes.light], ThemeProvider),
];

export const parameters = {
    docs: {
        theme: storybookTheme,
    },
    actions: {
        argTypesRegex: "^on[A-Z].*",
    },
    backgrounds: {
        default: themes.dark.name,
        values: [
            {
                name: themes.dark.name,
                value: themes.dark.colors.bg.body,
            },
            {
                name: themes.light.name,
                value: themes.light.colors.bg.body,
            },
        ],
    },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};
