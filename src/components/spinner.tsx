import type { LayoutProps, SpaceProps } from "styled-system";
import { forwardRef } from "react";
import { layout, space } from "styled-system";
import styled, { keyframes } from "styled-components";

import { VisuallyHidden } from "./visually-hidden";

export interface SpinnerProps
    extends React.HTMLAttributes<HTMLDivElement>,
        LayoutProps,
        SpaceProps {
    label?: string;
    thickness?: string;
    children?: React.ReactNode;
}

const spin = keyframes({
    "0%": {
        transform: "rotate(0deg)",
    },
    "100%": {
        transform: "rotate(360deg)",
    },
});

const StyledSpinner = styled.div<SpinnerProps>`
    display: inline-block;
    border-color: currentColor;
    border-style: solid;
    border-radius: 100%;
    border-width: ${(p) => p.thickness};
    border-bottom-color: transparent;
    border-left-color: transparent;
    animation: ${spin} 0.45s linear infinite;
    ${layout}
    ${space}
`;

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
    ({ label = "Loading...", size = "1.5rem", thickness = "2px", ...rest }, ref) => {
        return (
            <StyledSpinner ref={ref} size={size} thickness={thickness} {...rest}>
                {label ? <VisuallyHidden>{label}</VisuallyHidden> : null}
            </StyledSpinner>
        );
    },
);

if (process.env.NODE_ENV !== "production") {
    Spinner.displayName = "Spinner";
}
