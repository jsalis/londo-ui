import { isValidElement, cloneElement, forwardRef } from "react";
import PropTypes from "prop-types";

import { Button } from "./button";
import { VisuallyHidden } from "./visually-hidden";

export const IconButton = forwardRef((props, ref) => {
    const { "aria-label": label, icon, ...rest } = props;
    const children = isValidElement(icon) ? cloneElement(icon, { "aria-hidden": true }) : null;
    return (
        <Button ref={ref} aria-label={label} p={1} {...rest}>
            <VisuallyHidden>{label}</VisuallyHidden>
            {children}
        </Button>
    );
});

if (process.env.NODE_ENV !== "production") {
    IconButton.displayName = "IconButton";
    IconButton.propTypes = {
        "aria-label": PropTypes.string.isRequired,
        icon: PropTypes.node,
        className: PropTypes.string,
    };
}
