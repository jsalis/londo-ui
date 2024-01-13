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
import { useFloating, autoUpdate, offset, flip, shift, size } from "@floating-ui/react-dom";

import { useDisclosure, useForkRef, useEventListener } from "../hooks";

import type { BoxProps } from "./box";
import { Box } from "./box";
import { Portal } from "./portal";
import { getTransformOrigin } from "../utils/floating-util";

export interface TooltipProps extends BoxProps {
    title?: React.ReactNode;
    placement?: Placement;
    strategy?: Strategy;
    mouseEnterDelay?: number;
    mouseLeaveDelay?: number;
    onOpen?: () => void;
    onClose?: () => void;
    container?: HTMLElement | (() => HTMLElement);
    children?: React.ReactNode;
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
    (
        {
            title,
            placement = "top",
            strategy = "absolute",
            mouseEnterDelay = 100,
            mouseLeaveDelay = 100,
            onOpen,
            onClose,
            container,
            children,
            ...rest
        },
        ref
    ) => {
        const { isOpen, open, close, clearDelayTimer } = useDisclosure({ onOpen, onClose });

        const openWithDelay = () => open({ delay: mouseEnterDelay });
        const closeWithDelay = () => close({ delay: mouseLeaveDelay });

        const [anchorNode, setAnchorNode] = useState<HTMLElement | null>(null);
        const child = Children.only(children);
        const childProps = { ref: useForkRef((child as any).ref, setAnchorNode) };
        const anchor = isValidElement(child) ? cloneElement(child, childProps) : child;

        const middleware = [offset(8), flip({ padding: 8 }), shift({ padding: 8 }), size()];

        const {
            x,
            y,
            refs,
            reference,
            floating,
            update,
            placement: autoPlacement,
        } = useFloating({
            strategy,
            placement,
            middleware,
        });

        useLayoutEffect(() => reference(anchorNode), [anchorNode]);
        useLayoutEffect(() => update(), [isOpen, refs.floating.current]);

        useEffect(() => {
            if (isOpen && refs.reference.current && refs.floating.current) {
                return autoUpdate(refs.reference.current, refs.floating.current, update);
            }
            return;
        }, [isOpen, refs.reference.current, refs.floating.current, update]);

        useEventListener("mouseenter", openWithDelay, anchorNode);
        useEventListener("mouseleave", closeWithDelay, anchorNode);
        useEventListener("focus", openWithDelay, anchorNode);
        useEventListener("blur", closeWithDelay, anchorNode);

        return (
            <>
                {anchor}
                {isOpen ? (
                    <Portal container={container}>
                        <div
                            ref={floating}
                            role="tooltip"
                            style={{
                                position: strategy,
                                top: y ?? "",
                                left: x ?? "",
                                transformOrigin: getTransformOrigin(autoPlacement),
                                zIndex: 1,
                            }}
                        >
                            <Box
                                ref={ref}
                                p={1}
                                borderRadius="base"
                                boxShadow="base"
                                bg="tooltip.bg"
                                color={"tooltip.text" as any}
                                onMouseEnter={clearDelayTimer}
                                onMouseLeave={closeWithDelay}
                                {...rest}
                            >
                                {title}
                            </Box>
                        </div>
                    </Portal>
                ) : null}
            </>
        );
    }
);

if (process.env.NODE_ENV !== "production") {
    Tooltip.displayName = "Tooltip";
}
