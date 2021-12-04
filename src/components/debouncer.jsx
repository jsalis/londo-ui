import PropTypes from "prop-types";

import { useDebounceState } from "../hooks";

export function Debouncer({ value, onChange, wait, leading, children }) {
    const [currentValue, setCurrentValue] = useDebounceState(value, onChange, wait, leading);
    return <>{children({ value: currentValue, onChange: setCurrentValue })}</>;
}

if (process.env.NODE_ENV !== "production") {
    Debouncer.propTypes = {
        value: PropTypes.any,
        onChange: PropTypes.func,
        wait: PropTypes.number,
        leading: PropTypes.bool,
        children: PropTypes.func.isRequired,
    };
}

Debouncer.defaultProps = {
    wait: 400,
    leading: false,
};
