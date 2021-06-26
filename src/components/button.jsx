import styled, { css } from "styled-components";

import { Box } from "./box";

export const Button = styled(Box)`
    display: inline-block;
    position: relative;
    text-align: center;
    font-size: ${(p) => p.theme.fontSizes.sm}px;
    line-height: ${(p) => p.theme.lineHeights.none};
    padding: 4px 8px;
    min-width: 32px;
    height: 24px;
    border: 1px solid ${(p) => p.theme.colors.border.base};
    background: ${(p) => p.theme.colors.gray[1]};
    transition: all 0.3s;
    user-select: none;
    cursor: pointer;

    & + & {
        margin-left: -1px;
    }

    &,
    &:active,
    &:focus {
        outline: 0;
    }

    &:hover {
        border-color: ${(p) => p.theme.colors.gray[4]};
        color: ${(p) => p.theme.colors.gray[9]};
        background: ${(p) => p.theme.colors.gray[4]};
        z-index: 1;
    }

    &:active {
        background: ${(p) => p.theme.colors.gray[3]};
    }

    ${(p) =>
        p.active &&
        css`
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
                color: ${p.theme.colors.gray[4]};
                background: ${p.theme.colors.gray[1]};
                cursor: not-allowed;
            }
        `}
`;

Button.defaultProps = {
    as: "button",
};
