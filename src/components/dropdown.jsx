import { Children, cloneElement, forwardRef, useRef, useMemo } from "react";
import PropTypes from "prop-types";

import { useForkRef, useForkHandler } from "../hooks";

import { Box } from "./box";
import { Popper } from "./popper";
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

    const modifiers = useMemo(() => {
        const mods = [
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
        ];

        if (sameWidth) {
            mods.push({
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
            });
        }

        return mods;
    }, [sameWidth]);

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div>
                {anchor}
                <Popper
                    ref={ref}
                    anchor={anchorRef.current}
                    isOpen={isOpen}
                    placement={placement}
                    modifiers={modifiers}
                    keepMounted={keepMounted}
                    onMouseDown={(e) => e.preventDefault()}
                >
                    <Box py={1} borderRadius="base" boxShadow="base" bg="gray.1" {...rest}>
                        {overlay}
                    </Box>
                </Popper>
            </div>
        </ClickAwayListener>
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
    sameWidth: PropTypes.bool,
    keepMounted: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
};

Dropdown.defaultProps = {
    placement: "bottom-start",
    sameWidth: true,
    keepMounted: true,
};
