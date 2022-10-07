import { forwardRef } from "react";
import { space, variant } from "styled-system";
import styled, { css } from "styled-components";

import type { BoxProps } from "./box";
import { Box } from "./box";

export interface ButtonProps
    extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
        BoxProps {
    size?: "sm" | "md" | "lg";
    variant?: "default" | "primary" | "dash" | "text";
}

interface StyledButtonProps extends ButtonProps {
    $size: ButtonProps["size"];
}

const StyledButton = styled(Box)<StyledButtonProps>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    line-height: ${(p) => p.theme.lineHeights.none};
    outline: 0;
    border: 0;
    border-radius: ${(p) => p.theme.radii.base}px;
    background: transparent;
    transition: all 0.2s;
    user-select: none;
    cursor: pointer;
    ${space}

    &:focus:focus-visible {
        box-shadow: 0 0 0 2px ${(p) => p.theme.colors.primary[2]};
    }

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

    ${(p) =>
        variant({
            variants: {
                default: {
                    "--shadow-color": p.theme.colors.gray[5],
                    boxShadow: "0 2px 0 0 var(--shadow-color)",
                    bg: "gray.4",
                    ":hover": {
                        boxShadow: "0 3px 0 0 var(--shadow-color)",
                        transform: "translateY(-1px)",
                        color: "gray.9",
                    },
                    ":active": {
                        boxShadow: "0 1px 0 0 var(--shadow-color)",
                        transform: "translateY(1px)",
                        bg: "gray.3",
                    },
                    ":disabled": {
                        "--shadow-color": p.theme.colors.gray[4],
                        boxShadow: "0 3px 0 0 var(--shadow-color)",
                        transform: "translateY(0)",
                        bg: "gray.1",
                    },
                },
                primary: {
                    "--shadow-color": p.theme.colors.primary[7],
                    boxShadow: "0 2px 0 0 var(--shadow-color)",
                    color: "white",
                    bg: "primary.base",
                    ":hover": {
                        boxShadow: "0 3px 0 0 var(--shadow-color)",
                        transform: "translateY(-1px)",
                        color: "white",
                    },
                    ":active": {
                        boxShadow: "0 1px 0 0 var(--shadow-color)",
                        transform: "translateY(1px)",
                        bg: "primary.4",
                    },
                    ":disabled": {
                        "--shadow-color": p.theme.colors.gray[4],
                        boxShadow: "0 3px 0 0 var(--shadow-color)",
                        transform: "translateY(0)",
                        bg: "gray.1",
                    },
                },
                dash: {
                    borderWidth: "1px",
                    borderStyle: "dashed",
                    borderColor: "alpha.3",
                    ":hover": {
                        borderColor: "primary.base",
                        color: "gray.9",
                    },
                    ":active": {
                        borderColor: "primary.4",
                    },
                    ":disabled": {
                        borderColor: "alpha.1",
                    },
                },
                text: {
                    ":hover": {
                        bg: "alpha.1",
                        color: "gray.9",
                    },
                    ":active": {
                        bg: "alpha.3",
                    },
                    ":disabled": {
                        bg: "transparent",
                    },
                },
            },
        })}

    &:disabled {
        color: ${(p) => p.theme.colors.disabled};
        cursor: not-allowed;
    }
`;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ size = "md", variant = "default", color, children, ...rest }, ref) => {
        return (
            <StyledButton
                as="button"
                role="button"
                ref={ref}
                {...rest}
                $size={size}
                variant={variant}
                color={color as any}
            >
                {children}
            </StyledButton>
        );
    }
);

if (process.env.NODE_ENV !== "production") {
    Button.displayName = "Button";
}
