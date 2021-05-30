import { ThemeProvider, createGlobalStyle } from "styled-components";

import { themes, reset } from "../src/themes";

const GlobalStyle = createGlobalStyle`${reset}`;

export const decorators = [
    (Story) => (
        <ThemeProvider theme={themes.light}>
            <GlobalStyle />
            <Story />
        </ThemeProvider>
    ),
];

export const parameters = {
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
