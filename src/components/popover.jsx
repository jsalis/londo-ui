import { Children, cloneElement, forwardRef, useState } from "react";
import PropTypes from "prop-types";

import { useDisclosure, useForkRef, useEventListener } from "../hooks";

import { Box } from "./box";
import { Popper } from "./popper";

export const Popover = forwardRef((props, ref) => {
    const {
        title,
        content,
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

    return (
        <>
            {anchor}
            <Popper anchor={anchorNode} isOpen={isOpen} placement={placement} keepMounted>
                <Box
                    maxWidth={400}
                    borderRadius="base"
                    boxShadow="base"
                    bg="popover.bg"
                    onMouseEnter={clearDelayTimer}
                    onMouseLeave={closeWithDelay}
                    {...rest}
                >
                    {title && (
                        <Box p={2} borderBottom="split" color="heading">
                            {title}
                        </Box>
                    )}
                    <Box p={2}>{content}</Box>
                </Box>
            </Popper>
        </>
    );
});

if (process.env.NODE_ENV !== "production") {
    Popover.propTypes = {
        title: PropTypes.node,
        content: PropTypes.node,
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
}

Popover.defaultProps = {
    placement: "top",
    mouseEnterDelay: 100,
    mouseLeaveDelay: 100,
};
