import { Children, cloneElement, forwardRef, useRef, useMemo } from "react";
import PropTypes from "prop-types";

import { useClickOutside, useForkRef, useForkHandler } from "../hooks";

import { Box } from "./box";
import { Popper } from "./popper";

export const Dropdown = forwardRef((props, ref) => {
    const { overlay, placement, disabled, isOpen, onOpen, onClose, children, ...rest } =
        props;

    const clickOutside = useClickOutside(() => onClose?.());
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

    const anchorRef = useRef(null);
    const anchor = cloneElement(child, {
        ref: useForkRef(child.ref, anchorRef),
        onClick: useForkHandler(child.props.onClick, handleClick),
    });

    const modifiers = useMemo(() => {
        return [
            {
                name: "offset",
                options: {
                    offset: [0, 4],
                },
            },
            {
                name: "preventOverflow",
                options: {
                    mainAxis: false,
                },
            },
            {
                name: "sameWidth",
                phase: "beforeWrite",
                enabled: true,
                requires: ["computeStyles"],
                fn: ({ state }) => {
                    state.styles.popper.width = `${state.rects.reference.width}px`;
                },
                effect: ({ state }) => {
                    state.elements.popper.style.width = `${state.elements.reference.offsetWidth}px`;
                },
            },
        ];
    }, []);

    return (
        <div {...clickOutside}>
            {anchor}
            <Popper
                ref={ref}
                anchor={anchorRef.current}
                isOpen={isOpen}
                placement={placement}
                modifiers={modifiers}
                onMouseDown={(e) => e.preventDefault()}
                keepMounted
            >
                <Box py={1} borderRadius="base" boxShadow="base" bg="gray.1" {...rest}>
                    {overlay}
                </Box>
            </Popper>
        </div>
    );
});

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
    className: PropTypes.string,
    children: PropTypes.node,
};

Dropdown.defaultProps = {
    placement: "bottom",
};
