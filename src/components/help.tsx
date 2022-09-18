import { forwardRef } from "react";
import styled, { css } from "styled-components";

import type { BoxProps } from "./box";
import { Box } from "./box";

export interface HelpProps extends BoxProps {
    type?: "info" | "error" | "warning";
}

const makeTypeColor = (type: string, color: string) => (p: any) =>
    p.type === type &&
    css`
        background-color: ${p.theme.colors[color][0]};
        border: 1px solid ${p.theme.colors[color][2]};
        color: ${p.theme.colors[color][7]};
    `;

const StyledHelp = styled(Box)`
    ${makeTypeColor("info", "info")}
    ${makeTypeColor("error", "negative")}
    ${makeTypeColor("warning", "warning")}
`;

export const Help = forwardRef<HTMLDivElement, HelpProps>(
    ({ type = "info", color, children, ...rest }, ref) => (
        <>
            {children ? (
                <StyledHelp
                    ref={ref}
                    type={type}
                    p={2}
                    bg="primary.base"
                    borderRadius="base"
                    color={color as any}
                    {...rest}
                >
                    {children}
                </StyledHelp>
            ) : null}
        </>
    )
);

if (process.env.NODE_ENV !== "production") {
    Help.displayName = "Help";
}
