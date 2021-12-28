import styled, { css } from "styled-components";
import { space } from "styled-system";

import { Box } from "./box";

export const Button = styled(Box)`
    --shadow-color: ${(p) => p.theme.colors.gray[5]};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: ${(p) => p.theme.fontSizes.sm}px;
    line-height: ${(p) => p.theme.lineHeights.none};
    padding: 4px 8px;
    min-width: 24px;
    height: 24px;
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
`;

if (process.env.NODE_ENV !== "production") {
    Button.displayName = "Button";
}

Button.defaultProps = {
    as: "button",
};
