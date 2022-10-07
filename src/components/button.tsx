import { forwardRef } from "react";
import { space, variant } from "styled-system";
import styled, { css } from "styled-components";

import type { BoxProps } from "./box";
import { Box } from "./box";

export interface ButtonProps
    extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
        BoxProps {
    size?: "sm" | "md" | "lg";
    active?: boolean;
}

interface StyledButtonProps extends ButtonProps {
    $size: ButtonProps["size"];
}

const StyledButton = styled(Box)<StyledButtonProps>`
    --shadow-color: ${(p) => p.theme.colors.gray[5]};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    line-height: ${(p) => p.theme.lineHeights.none};
    outline: 0;
    border: 0;
    border-radius: ${(p) => p.theme.radii.base}px;
    background: ${(p) => p.theme.colors.gray[4]};
    box-shadow: 0 2px 0 0 var(--shadow-color);
    transition: all 0.2s;
    user-select: none;
    cursor: pointer;
    ${space}

    &:focus:focus-visible {
        box-shadow: 0 0 0 2px ${(p) => p.theme.colors.primary[2]};
    }

    &:hover {
        color: ${(p) => p.theme.colors.gray[9]};
        box-shadow: 0 3px 0 0 var(--shadow-color);
        transform: translateY(-1px);
    }

    &:active {
        background: ${(p) => p.theme.colors.gray[3]};
        box-shadow: 0 1px 0 0 var(--shadow-color);
        transform: translateY(1px);
    }

    ${(p) =>
        p.active &&
        css`
            --shadow-color: ${(p) => p.theme.colors.primary[7]};

            &,
            &:hover {
                color: #fff;
                background: ${p.theme.colors.primary.base};
            }
        `}

    ${(p) =>
        p.disabled &&
        css`
            &,
            &:hover {
                color: ${p.theme.colors.disabled};
                background: ${p.theme.colors.gray[1]};
                box-shadow: 0 2px 0 0 ${p.theme.colors.gray[4]};
                transform: translateY(0);
                cursor: not-allowed;
            }
        `}

    ${variant({
        prop: "$size",
        variants: {
            sm: {
                fontSize: "sm",
                paddingX: "sm",
                height: "24px",
                minWidth: "24px",
            },
            md: {
                fontSize: "md",
                paddingX: "md",
                height: "32px",
                minWidth: "32px",
            },
            lg: {
                fontSize: "lg",
                paddingX: "md",
                height: "40px",
                minWidth: "40px",
            },
        },
    })}

    ${variant({
        variants: {
            text: {
                bg: "transparent",
                boxShadow: "none",
                transform: "none !important",
                ":hover": {
                    bg: "alpha.1",
                    boxShadow: "none",
                },
                ":active": {
                    bg: "alpha.3",
                },
            },
        },
    })}
`;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ size = "md", color, children, ...rest }, ref) => {
        return (
            <StyledButton as="button" ref={ref} {...rest} $size={size} color={color as any}>
                {children}
            </StyledButton>
        );
    }
);

if (process.env.NODE_ENV !== "production") {
    Button.displayName = "Button";
}
