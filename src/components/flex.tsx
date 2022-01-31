import type * as CSS from "csstype";
import type { ResponsiveValue } from "styled-system";
import { system } from "styled-system";
import styled from "styled-components";

import type { BoxProps } from "./box";
import { Box } from "./box";

export interface FlexProps extends BoxProps {
    inline?: boolean;
    align?: ResponsiveValue<CSS.Property.AlignItems>;
    basis?: ResponsiveValue<CSS.Property.FlexBasis>;
    direction?: ResponsiveValue<CSS.Property.FlexDirection>;
    grow?: ResponsiveValue<CSS.Property.FlexGrow>;
    justify?: ResponsiveValue<CSS.Property.JustifyContent>;
    shrink?: ResponsiveValue<CSS.Property.FlexShrink>;
    wrap?: ResponsiveValue<CSS.Property.FlexWrap>;
}

const flex = system({
    align: {
        property: "alignItems",
    },
    basis: {
        property: "flexBasis",
    },
    direction: {
        property: "flexDirection",
    },
    grow: {
        property: "flexGrow",
    },
    justify: {
        property: "justifyContent",
    },
    shrink: {
        property: "flexShrink",
    },
    wrap: {
        property: "flexWrap",
    },
});

export const Flex = styled(Box)<FlexProps>`
    display: ${(p) => (p.inline ? "inline-flex" : "flex")};
    ${flex}
`;

if (process.env.NODE_ENV !== "production") {
    Flex.displayName = "Flex";
}
