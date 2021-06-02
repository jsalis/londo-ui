import { createGlobalStyle } from "styled-components";

import { ThemeProvider, reset } from "../src";

import { storybookTheme } from "./theme";

const GlobalStyle = createGlobalStyle`${reset}`;

export const decorators = [
    (Story) => (
        <ThemeProvider theme="dark">
            <GlobalStyle />
            <Story />
        </ThemeProvider>
    ),
];

export const parameters = {
    docs: {
        theme: storybookTheme,
    },
    actions: {
        argTypesRegex: "^on[A-Z].*",
    },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};
