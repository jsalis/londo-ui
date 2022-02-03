import { ThemeProvider as BaseThemeProvider } from "styled-components";

import { themes } from "../themes";
import { isString } from "../utils/type-util";

export interface ThemeProviderProps {
    theme?: "light" | "dark" | object;
    children?: React.ReactNode;
}

export function ThemeProvider({ theme = "dark", children }: ThemeProviderProps) {
    const t = isString(theme) ? themes[theme] : theme;
    return <BaseThemeProvider theme={t}>{children}</BaseThemeProvider>;
}

if (process.env.NODE_ENV !== "production") {
    ThemeProvider.displayName = "ThemeProvider";
}
