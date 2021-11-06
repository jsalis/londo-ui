import { forwardRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { system, margin, layout } from "styled-system";

const other = system({
    pointerEvents: true,
    cursor: true,
});

const Swatch = styled.span`
    display: inline-block;
    border-radius: 2px;
    box-shadow: ${(props) => props.theme.colors.alpha[1]} 0 0 0 1px inset;
    ${margin}
    ${layout}
    ${other}
`;

export const ColorSwatch = forwardRef((props, ref) => {
    const { color, style, ...rest } = props;
    return <Swatch ref={ref} {...rest} style={{ backgroundColor: color, ...style }} />;
});

ColorSwatch.propTypes = {
    color: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    className: PropTypes.string,
    style: PropTypes.object,
};

ColorSwatch.defaultProps = {
    color: "#000000",
    size: 14,
};
