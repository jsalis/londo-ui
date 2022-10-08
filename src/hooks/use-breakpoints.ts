import { useTheme } from "styled-components";

import { useMediaQuery } from "./use-media-query";

/**
 * Uses media query breakpoints based on the theme context.
 */
export function useBreakpoints() {
    const theme: any = useTheme();
    const md = useMediaQuery(`screen and (min-width: ${theme.breakpoints.md})`);
    const lg = useMediaQuery(`screen and (min-width: ${theme.breakpoints.lg})`);
    return { md, lg };
}
