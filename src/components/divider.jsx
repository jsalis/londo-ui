import { forwardRef } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { space } from "styled-system";

const StyledDivider = styled.div`
    line-height: ${(props) => props.theme.lineHeights.base};
    font-size: ${(props) => props.theme.fontSizes.md}px;
    color: ${(props) => props.theme.colors.text};
    background: ${(props) => props.theme.colors.border.base};
    ${space}

    ${(props) =>
        !props.children &&
        css`
            display: block;
            clear: both;
            width: 100%;
            min-width: 100%;
            height: 1px;
        `}
    
    ${(props) =>
        props.children &&
        css`
            display: table;
            color: ${props.theme.colors.heading};
            font-size: ${props.theme.fontSizes.lg}px;
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
                border-top: ${props.theme.borders.base};
                pointer-events: none;
                content: "";
            }

            ${props.align === "left" &&
            css`
                &::before {
                    width: 5%;
                }

                &::after {
                    width: 95%;
                }
            `}

            ${props.align === "right" &&
            css`
                &::before {
                    width: 95%;
                }

                &::after {
                    width: 5%;
                }
            `}
        `}
    
    ${(props) =>
        props.dashed &&
        css`
            border-color: ${props.theme.colors.border.base};
            border-style: dashed;
            border-width: 1px 0 0;
            background: none;
        `}
    
    ${(props) =>
        props.dashed &&
        props.children &&
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
