import styled, { css } from "styled-components";

import { Box } from "./box";

export const Button = styled(Box)`
    display: inline-block;
    position: relative;
    text-align: center;
    padding: 4px 8px;
    min-width: 32px;
    height: 24px;
    border: 1px solid ${(props) => props.theme.colors.border.base};
    background: ${(props) => props.theme.colors.gray[1]};
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
        border-color: ${(props) => props.theme.colors.gray[4]};
        color: ${(props) => props.theme.colors.gray[9]};
        background: ${(props) => props.theme.colors.gray[4]};
        z-index: 1;
    }

    &:active {
        background: ${(props) => props.theme.colors.gray[3]};
    }

    ${(props) =>
        props.active &&
        css`
            &,
            &:hover {
                color: #fff;
                background: ${props.theme.colors.primary.base};
            }
        `}

    ${(props) =>
        props.disabled &&
        css`
            &,
            &:hover {
                color: ${props.theme.colors.gray[4]};
                background: ${props.theme.colors.gray[1]};
                cursor: not-allowed;
            }
        `}
`;

Button.defaultProps = {
    as: "button",
};
