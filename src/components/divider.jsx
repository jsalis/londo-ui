import { forwardRef } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { space } from "styled-system";

const StyledDivider = styled.div`
    line-height: ${(p) => p.theme.lineHeights.base};
    font-size: ${(p) => p.theme.fontSizes.md}px;
    color: ${(p) => p.theme.colors.text};
    background: ${(p) => p.theme.colors.border.base};
    ${space}

    ${(p) =>
        !p.children &&
        css`
            display: block;
            clear: both;
            width: 100%;
            min-width: 100%;
            height: 1px;
        `}
    
    ${(p) =>
        p.children &&
        css`
            display: table;
            color: ${p.theme.colors.heading};
            font-size: ${p.theme.fontSizes.lg}px;
            font-weight: 500;
            white-space: nowrap;
            text-align: center;
            background: transparent;

            &::before,
            &::after {
                display: table-cell;
                position: relative;
                top: 50%;
                width: 50%;
                transform: translateY(50%);
                border-top: ${p.theme.borders.base};
                pointer-events: none;
                content: "";
            }

            ${p.align === "left" &&
            css`
                &::before {
                    width: 5%;
                }

                &::after {
                    width: 95%;
                }
            `}

            ${p.align === "right" &&
            css`
                &::before {
                    width: 95%;
                }

                &::after {
                    width: 5%;
                }
            `}
        `}
    
    ${(p) =>
        p.dashed &&
        css`
            border-color: ${p.theme.colors.border.base};
            border-style: dashed;
            border-width: 1px 0 0;
            background: none;
        `}
    
    ${(p) =>
        p.dashed &&
        p.children &&
        css`
            border-top: 0;

            &::before,
            &::after {
                border-style: dashed none none;
            }
        `}
`;

const InnerText = styled.span`
    display: inline-block;
    padding: 0 1em;
`;

export const Divider = forwardRef(({ align, dashed, children, ...rest }, ref) => {
    return (
        <StyledDivider ref={ref} {...rest} align={align} dashed={dashed}>
            {children && <InnerText>{children}</InnerText>}
        </StyledDivider>
    );
});

Divider.propTypes = {
    align: PropTypes.oneOf(["left", "right", "center"]),
    dashed: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
};

Divider.defaultProps = {
    align: "center",
    dashed: false,
};
