import {
    forwardRef,
    useRef,
    useState,
    useEffect,
    useCallback,
    useLayoutEffect,
    useImperativeHandle,
} from "react";
import PropTypes from "prop-types";
import { createPopper } from "@popperjs/core";

import { HTMLElementType } from "../utils/prop-types";
import { isFunction } from "../utils/type-util";
import { assignRef } from "../utils/react-util";
import { useForkRef } from "../hooks";

import { Portal } from "./portal";

export const Popper = forwardRef((props, ref) => {
    const {
        anchor,
        children,
        container,
        isOpen,
        keepMounted = false,
        modifiers,
        offset,
        placement: initialPlacement = "bottom",
        popperRef: popperRefProp,
        style,
        transition = false,
        ...rest
    } = props;

    const tooltipRef = useRef(null);
    const ownRef = useForkRef(tooltipRef, ref);
    const popperRef = useRef(null);
    const handlePopperRef = useForkRef(popperRef, popperRefProp);
    const handlePopperRefRef = useRef(handlePopperRef);

    useLayoutEffect(() => {
        handlePopperRefRef.current = handlePopperRef;
    }, [handlePopperRef]);

    useImperativeHandle(popperRefProp, () => popperRef.current, []);

    const [exited, setExited] = useState(true);
    const [placement, setPlacement] = useState(initialPlacement);

    useEffect(() => {
        popperRef.current?.forceUpdate();
    });

    const handleOpen = useCallback(() => {
        if (!tooltipRef.current || !anchor || !isOpen) {
            return;
        }

        if (popperRef.current) {
            popperRef.current.destroy();
            handlePopperRefRef.current(null);
        }

        const handlePopperUpdate = (data) => {
            setPlacement(data.placement);
        };

        const popperModifiers = [
            // @see https://popper.js.org/docs/v2/modifiers/offset/
            {
                name: "offset",
                options: {
                    offset: offset ?? [0, 8],
                },
            },
            // @see https://popper.js.org/docs/v2/modifiers/prevent-overflow/
            {
                name: "preventOverflow",
                options: {
                    altBoundary: false,
                },
            },
            // @see https://popper.js.org/docs/v2/modifiers/flip/
            {
                name: "flip",
                options: {
                    altBoundary: false,
                    padding: 8,
                },
            },
            {
                name: "onUpdate",
                phase: "afterWrite",
                enabled: true,
                fn: ({ state }) => {
                    handlePopperUpdate(state);
                },
            },
            ...(modifiers ?? []),
        ];

        const anchorEl = isFunction(anchor) ? anchor() : anchor;
        const popper = createPopper(anchorEl, tooltipRef.current, {
            placement: initialPlacement,
            modifiers: popperModifiers,
        });

        handlePopperRefRef.current(popper);
    }, [anchor, modifiers, isOpen, offset, initialPlacement]);

    const handleRef = useCallback(
        (node) => {
            assignRef(ownRef, node);
            handleOpen();
        },
        [ownRef, handleOpen]
    );

    const handleEnter = () => {
        setExited(false);
    };

    const handleClose = () => {
        if (!popperRef.current) {
            return;
        }
        popperRef.current.destroy();
        handlePopperRefRef.current(null);
    };

    const handleExited = () => {
        setExited(true);
        handleClose();
    };

    useEffect(() => {
        return () => {
            handleClose();
        };
    }, []);

    useEffect(() => {
        if (!isOpen && !transition) {
            handleClose();
        }
    }, [isOpen, transition]);

    if (!keepMounted && !isOpen && (!transition || exited)) {
        return null;
    }

    const childProps = { placement };

    if (transition) {
        childProps.transition = {
            in: isOpen,
            onEnter: handleEnter,
            onExited: handleExited,
        };
    }

    return (
        <Portal container={container}>
            <div
                ref={handleRef}
                role="tooltip"
                {...rest}
                style={{
                    // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
                    position: "fixed",
                    top: 0,
                    left: 0,
                    display: !isOpen && keepMounted && !transition ? "none" : null,
                    zIndex: 1,
                    ...style,
                }}
            >
                {isFunction(children) ? children(childProps) : children}
            </div>
        </Portal>
    );
});

if (process.env.NODE_ENV !== "production") {
    Popper.displayName = "Popper";
    Popper.propTypes = {
        isOpen: PropTypes.bool.isRequired,
        keepMounted: PropTypes.bool,
        anchor: PropTypes.oneOfType([HTMLElementType, PropTypes.func]),
        children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
        container: PropTypes.oneOfType([HTMLElementType, PropTypes.func]),
        modifiers: PropTypes.arrayOf(
            PropTypes.shape({
                data: PropTypes.object,
                effect: PropTypes.func,
                enabled: PropTypes.bool,
                fn: PropTypes.func,
                name: PropTypes.any.isRequired,
                options: PropTypes.object,
                phase: PropTypes.oneOf([
                    "afterMain",
                    "afterRead",
                    "afterWrite",
                    "beforeMain",
                    "beforeRead",
                    "beforeWrite",
                    "main",
                    "read",
                    "write",
                ]),
                requires: PropTypes.arrayOf(PropTypes.string),
                requiresIfExists: PropTypes.arrayOf(PropTypes.string),
            })
        ),
        offset: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.func]),
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
        popperRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        style: PropTypes.object,
        transition: PropTypes.bool,
    };
}
