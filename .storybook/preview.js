import { ThemeProvider, createGlobalStyle } from "styled-components";

import { themes, reset } from "../src/themes";
import { storybookTheme } from "./theme";

const GlobalStyle = createGlobalStyle`${reset}`;

export const decorators = [
    (Story) => (
        <ThemeProvider theme={themes.dark}>
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
