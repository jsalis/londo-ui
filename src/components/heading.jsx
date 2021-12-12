import { forwardRef } from "react";
import PropTypes from "prop-types";

import { Text } from "./text";

export const Heading = forwardRef(({ level, ...rest }, ref) => (
    <Text ref={ref} as={`h${level}`} fontSize={Math.max(0, 7 - level)} {...rest} />
));

if (process.env.NODE_ENV !== "production") {
    Heading.displayName = "Heading";
    Heading.propTypes = {
        level: PropTypes.oneOf([1, 2, 3, 4, 5]),
        ellipsis: PropTypes.bool,
        disabled: PropTypes.bool,
        strong: PropTypes.bool,
        underline: PropTypes.bool,
        italic: PropTypes.bool,
        delete: PropTypes.bool,
        code: PropTypes.bool,
        keyboard: PropTypes.bool,
        children: PropTypes.node,
    };
}

Heading.defaultProps = {
    level: 2,
    color: "heading",
    lineHeight: "shorter",
};
