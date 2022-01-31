import * as React from "react";

import type { TextProps } from "./text";
import { Text } from "./text";

export interface HeadingProps extends TextProps {
    level?: 1 | 2 | 3 | 4 | 5;
}

export const Heading = React.forwardRef<HTMLElement, HeadingProps>(
    ({ level = 2, ...rest }, ref) => (
        <Text ref={ref} as={`h${level}`} fontSize={Math.max(0, 7 - level)} {...rest} />
    )
);

if (process.env.NODE_ENV !== "production") {
    Heading.displayName = "Heading";
}

Heading.defaultProps = {
    color: "heading",
    lineHeight: "shorter",
};
