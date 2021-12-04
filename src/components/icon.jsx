import PropTypes from "prop-types";
import styled from "styled-components";
import { system, typography, space, layout, color } from "styled-system";

const other = system({
    cursor: true,
});

export const Icon = styled.svg`
    display: inline-block;
    user-select: none;
    ${typography}
    ${space}
    ${layout}
    ${color}
    ${other}
`;

if (process.env.NODE_ENV !== "production") {
    Icon.propTypes = {
        size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        viewBox: PropTypes.string,
        fill: PropTypes.string,
        color: PropTypes.string,
        className: PropTypes.string,
        children: PropTypes.node,
    };
}

Icon.defaultProps = {
    size: 14,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    color: "inherit",
};
