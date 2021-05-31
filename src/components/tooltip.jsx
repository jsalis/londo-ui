import { Children, cloneElement, forwardRef, useState } from "react";
import PropTypes from "prop-types";

import { useDisclosure, useForkRef, useEventListener } from "../hooks";

import { Box } from "./box";
import { Popper } from "./popper";

export const Tooltip = forwardRef((props, ref) => {
    const {
        title,
        placement,
        mouseEnterDelay,
        mouseLeaveDelay,
        onOpen,
        onClose,
        children,
        ...rest
    } = props;

    const { isOpen, open, close, clearDelayTimer } = useDisclosure({ onOpen, onClose });

    const openWithDelay = () => open({ delay: mouseEnterDelay });
    const closeWithDelay = () => close({ delay: mouseLeaveDelay });

    const [anchorNode, setAnchorNode] = useState(null);
    const child = Children.only(children);
    const anchor = cloneElement(child, {
        ref: useForkRef(child.ref, ref, setAnchorNode),
    });

    useEventListener("mouseenter", openWithDelay, anchorNode);
    useEventListener("mouseleave", closeWithDelay, anchorNode);
    useEventListener("focus", openWithDelay, anchorNode);
    useEventListener("blur", closeWithDelay, anchorNode);

    return (
        <>
            {anchor}
            <Popper anchor={anchorNode} isOpen={isOpen} placement={placement}>
                <Box
                    p={1}
                    borderRadius="base"
                    boxShadow="base"
                    bg="tooltip.bg"
                    color="tooltip.text"
                    onMouseEnter={clearDelayTimer}
                    onMouseLeave={closeWithDelay}
                    {...rest}
                >
                    {title}
                </Box>
            </Popper>
        </>
    );
});

Tooltip.propTypes = {
    title: PropTypes.node,
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
    mouseEnterDelay: PropTypes.number,
    mouseLeaveDelay: PropTypes.number,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.node,
};

Tooltip.defaultProps = {
    placement: "top",
    mouseEnterDelay: 100,
    mouseLeaveDelay: 100,
};
