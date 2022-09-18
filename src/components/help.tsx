import { forwardRef } from "react";

import type { BoxProps } from "./box";
import { Box } from "./box";

export const Help = forwardRef<HTMLDivElement, BoxProps>(
    ({ color = "#fff", children, ...rest }, ref) => (
        <>
            {children ? (
                <Box
                    ref={ref}
                    p={2}
                    bg="primary.base"
                    borderRadius="base"
                    color={color as any}
                    {...rest}
                >
                    {children}
                </Box>
            ) : null}
        </>
    )
);

if (process.env.NODE_ENV !== "production") {
    Help.displayName = "Help";
}
