import { forwardRef } from "react";
import PropTypes from "prop-types";

import { Input } from "./input";

export const Textarea = forwardRef((props, ref) => {
    return <Input ref={ref} as="textarea" height="auto" minHeight={54} py={1} {...props} />;
});

Textarea.propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    readOnly: PropTypes.bool,
    disabled: PropTypes.bool,
    rows: PropTypes.number,
    className: PropTypes.string,
};
