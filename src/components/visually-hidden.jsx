import PropTypes from "prop-types";
import styled from "styled-components";

export const VisuallyHidden = styled.span`
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    width: 1px;
    padding: 0;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    word-wrap: normal;
`;

if (process.env.NODE_ENV !== "production") {
    VisuallyHidden.displayName = "VisuallyHidden";
    VisuallyHidden.propTypes = {
        className: PropTypes.string,
        children: PropTypes.node,
    };
}
