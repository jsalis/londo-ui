import { ThemeProvider as BaseThemeProvider } from "styled-components";
import PropTypes from "prop-types";

import { themes } from "../themes";
import { isString } from "../utils/type-util";

export function ThemeProvider({ theme, children }) {
    const t = isString(theme) ? themes[theme] : theme;
    return <BaseThemeProvider theme={t}>{children}</BaseThemeProvider>;
}

if (process.env.NODE_ENV !== "production") {
    ThemeProvider.propTypes = {
        theme: PropTypes.oneOfType([PropTypes.oneOf(["light", "dark"]), PropTypes.object]),
        children: PropTypes.node,
    };
}

ThemeProvider.defaultProps = {
    theme: "dark",
};
