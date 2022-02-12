import { Children, cloneElement, forwardRef, useRef } from "react";
import PropTypes from "prop-types";

import { useForkRef, useForkHandler } from "../hooks";

import { Box } from "./box";
import { Floater } from "./floater";
import { ClickAwayListener } from "./click-away-listener";

export const Dropdown = forwardRef((props, ref) => {
    const {
        overlay,
        placement,
        disabled,
        isOpen,
        onOpen,
        onClose,
        sameWidth,
        keepMounted,
        children,
        ...rest
    } = props;

    const child = Children.only(children);

    const handleClick = () => {
        if (!disabled) {
            if (isOpen) {
                onClose?.();
            } else {
                onOpen?.();
            }
        }
    };

    const handleClickAway = () => {
        if (isOpen) {
            onClose?.();
        }
    };

    const anchorRef = useRef(null);
    const anchor = cloneElement(child, {
        ref: useForkRef(child.ref, anchorRef),
        onClick: useForkHandler(child.props.onClick, handleClick),
    });

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div>
                {anchor}
                <Floater
                    ref={ref}
                    offset={4}
                    anchor={anchorRef.current}
                    isOpen={isOpen}
                    placement={placement}
                    keepMounted={keepMounted}
                    onMouseDown={(e) => e.preventDefault()}
                    matchWidth
                >
                    <Box py={1} borderRadius="base" boxShadow="base" bg="dropdown.bg" {...rest}>
                        {overlay}
                    </Box>
                </Floater>
            </div>
        </ClickAwayListener>
    );
});

if (process.env.NODE_ENV !== "production") {
    Dropdown.displayName = "Dropdown";
    Dropdown.propTypes = {
        overlay: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
        placement: PropTypes.oneOf([
            "auto-end",
            "auto-start",
            "auto",
            "bottom-end",
            "bottom-start",
            "bottom",
            "left-end",
            "left-start",
            "left",
            "right-end",
            "right-start",
            "right",
            "top-end",
            "top-start",
            "top",
        ]),
        disabled: PropTypes.bool,
        isOpen: PropTypes.bool,
        onOpen: PropTypes.func,
        onClose: PropTypes.func,
        sameWidth: PropTypes.bool,
        keepMounted: PropTypes.bool,
        className: PropTypes.string,
        children: PropTypes.node,
    };
}

Dropdown.defaultProps = {
    placement: "bottom-start",
    sameWidth: true,
    keepMounted: true,
};
