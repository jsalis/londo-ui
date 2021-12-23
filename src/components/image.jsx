import styled, { css } from "styled-components";
import PropTypes from "prop-types";

import { Box } from "./box";

export const Image = styled(Box)`
    ${(p) =>
        p.pixelated &&
        css`
            image-rendering: pixelated;
            image-rendering: crisp-edges;
        `}
`;

if (process.env.NODE_ENV !== "production") {
    Image.displayName = "Image";
    Image.propTypes = {
        as: PropTypes.any,
        src: PropTypes.string,
        alt: PropTypes.string,
        pixelated: PropTypes.bool,
        className: PropTypes.string,
    };
}

Image.defaultProps = {
    as: "img",
};
