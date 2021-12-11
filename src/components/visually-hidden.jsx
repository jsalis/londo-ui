import { forwardRef } from "react";
import PropTypes from "prop-types";

export const VisuallyHidden = forwardRef((props, ref) => {
    const { as: Component, style = {}, ...rest } = props;
    return (
        <Component
            ref={ref}
            style={{
                border: "0",
                clip: "rect(0 0 0 0)",
                height: "1px",
                width: "1px",
                padding: "0",
                overflow: "hidden",
                position: "absolute",
                whiteSpace: "nowrap",
                wordWrap: "normal",
                ...style,
            }}
            {...rest}
        />
    );
});

if (process.env.NODE_ENV !== "production") {
    VisuallyHidden.displayName = "VisuallyHidden";
    VisuallyHidden.propTypes = {
        as: PropTypes.any,
        style: PropTypes.object,
        children: PropTypes.node,
    };
}

VisuallyHidden.defaultProps = {
    as: "span",
};
