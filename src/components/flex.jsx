import styled from "styled-components";
import { system } from "styled-system";
import PropTypes from "prop-types";

import { Box } from "./box";

const flex = system({
    align: {
        property: "alignItems",
    },
    basis: {
        property: "flexBasis",
    },
    direction: {
        property: "flexDirection",
    },
    grow: {
        property: "flexGrow",
    },
    justify: {
        property: "justifyContent",
    },
    shrink: {
        property: "flexShrink",
    },
    wrap: {
        property: "flexWrap",
    },
});

export const Flex = styled(Box)`
    display: ${(p) => (p.inline ? "inline-flex" : "flex")};
    ${flex}
`;

if (process.env.NODE_ENV !== "production") {
    Flex.displayName = "Flex";
    Flex.propTypes = {
        align: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
        basis: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
        direction: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
        grow: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
        justify: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
        shrink: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
        wrap: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
        className: PropTypes.string,
    };
}
