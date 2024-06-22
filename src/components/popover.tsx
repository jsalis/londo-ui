import type { ColorProps } from "styled-system";
import type { Placement, Strategy } from "@floating-ui/react-dom";
import {
    Children,
    isValidElement,
    cloneElement,
    forwardRef,
    useState,
    useEffect,
    useLayoutEffect,
} from "react";
import { useFloating, autoUpdate, offset, flip, shift, arrow, size } from "@floating-ui/react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { color } from "styled-system";
import styled from "styled-components";

import { useDisclosure, useForkRef, useEventListener } from "../hooks";

import type { BoxProps } from "./box";
import { Box } from "./box";
import { Portal } from "./portal";
import { ClickAwayListener } from "./click-away-listener";
import { KeyCode } from "../utils/key-code";
import { getStaticSide, getTransformOrigin } from "../utils/floating-util";
import { isNumber } from "../utils/type-util";

export interface PopoverProps extends BoxProps {
    title?: React.ReactNode;
    content?: React.ReactNode;
    placement?: Placement;
    strategy?: Strategy;
    trigger?: "hover" | "click";
    mouseEnterDelay?: number;
    mouseLeaveDelay?: number;
    isOpen?: boolean;
    defaultIsOpen?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
    container?: HTMLElement | (() => HTMLElement);
    children?: React.ReactNode;
}

interface ArrowProps extends ColorProps {}

const Arrow = styled.div<ArrowProps>`
    position: absolute;
    width: 8px;
    height: 8px;
    transform: rotate(45deg);
    overflow: hidden;
    pointer-events: none;
    ${color}
`;

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
    (
        {
            title,
            content,
            placement = "top",
            strategy = "absolute",
            trigger = "hover",
            mouseEnterDelay = 100,
            mouseLeaveDelay = 100,
            isOpen: isOpenProp,
            defaultIsOpen,
            onOpen,
            onClose,
            color,
            container,
            children,
            ...rest
        },
        ref,
    ) => {
        const { isOpen, open, close, toggle, clearDelayTimer } = useDisclosure({
            isOpen: isOpenProp,
            defaultIsOpen,
            onOpen,
            onClose,
        });

        const openWithDelay = () => open({ delay: mouseEnterDelay });
        const closeWithDelay = () => close({ delay: mouseLeaveDelay });

        const handleMouseEnter = () => {
            if (trigger === "hover") {
                clearDelayTimer();
            }
        };

        const handleMouseLeave = () => {
            if (trigger === "hover") {
                closeWithDelay();
            }
        };

        const handleKeyDown = (event: Event) => {
            if (trigger === "click" && (event as KeyboardEvent).key === KeyCode.ESC && isOpen) {
                close();
            }
        };

        const handleClickAway = (event: MouseEvent) => {
            if (!anchorNode || !event.composedPath().includes(anchorNode)) {
                closeWithDelay();
            }
        };

        const [anchorNode, setAnchorNode] = useState<HTMLElement | null>(null);
        const [arrowNode, setArrowNode] = useState<HTMLElement | null>(null);
        const child = Children.only(children);
        const childProps = { ref: useForkRef((child as any).ref, setAnchorNode) };
        const anchor = isValidElement(child) ? cloneElement(child, childProps) : child;

        const middleware = [offset(12), flip({ padding: 12 }), shift({ padding: 12 }), size()];

        if (arrowNode) {
            middleware.push(arrow({ element: arrowNode, padding: 8 }));
        }

        const {
            x,
            y,
            refs,
            update,
            middlewareData,
            placement: autoPlacement,
        } = useFloating({
            strategy,
            placement,
            middleware,
            elements: { reference: anchorNode },
        });

        useLayoutEffect(() => update(), [isOpen, refs.floating.current]);

        useLayoutEffect(() => {
            if (arrowNode) {
                const { x, y } = middlewareData.arrow ?? {};
                const staticSide = getStaticSide(autoPlacement);

                Object.assign(arrowNode.style, {
                    left: isNumber(x) ? `${x}px` : "",
                    top: isNumber(y) ? `${y}px` : "",
                    right: "",
                    bottom: "",
                    [staticSide]: "-3.5px",
                });
            }
        });

        useEffect(() => {
            if (isOpen && refs.reference.current && refs.floating.current) {
                return autoUpdate(refs.reference.current, refs.floating.current, update);
            }
            return;
        }, [isOpen, refs.reference.current, refs.floating.current, update]);

        useEventListener("mouseenter", openWithDelay, trigger === "hover" ? anchorNode : null);
        useEventListener("mouseleave", closeWithDelay, trigger === "hover" ? anchorNode : null);
        useEventListener("click", () => toggle(), trigger === "click" ? anchorNode : null);
        useEventListener("keydown", handleKeyDown, trigger === "click" ? anchorNode : null);

        return (
            <>
                {anchor}
                <AnimatePresence>
                    {isOpen ? (
                        <Portal container={container}>
                            <motion.div
                                ref={refs.setFloating}
                                role="tooltip"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                                style={{
                                    position: strategy,
                                    top: y ?? "",
                                    left: x ?? "",
                                    transformOrigin: getTransformOrigin(autoPlacement),
                                    zIndex: 1,
                                }}
                            >
                                <ClickAwayListener
                                    mouseEvent="onMouseDown"
                                    onClickAway={handleClickAway}
                                >
                                    <Box
                                        ref={ref}
                                        minWidth={120}
                                        maxWidth={300}
                                        lineHeight="base"
                                        borderRadius="base"
                                        boxShadow="base"
                                        bg="popover.bg"
                                        userSelect="text"
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                        color={color as any}
                                        {...rest}
                                    >
                                        <Arrow ref={setArrowNode} bg="popover.bg" />
                                        {title ? (
                                            <Box
                                                p={2}
                                                borderBottom="split"
                                                color="heading"
                                                fontWeight="bold"
                                            >
                                                {title}
                                            </Box>
                                        ) : null}
                                        <Box p={2}>{content}</Box>
                                    </Box>
                                </ClickAwayListener>
                            </motion.div>
                        </Portal>
                    ) : null}
                </AnimatePresence>
            </>
        );
    },
);

if (process.env.NODE_ENV !== "production") {
    Popover.displayName = "Popover";
}
