import { Children, isValidElement, cloneElement, forwardRef, useState } from "react";

import { useDisclosure, useForkRef, useEventListener } from "../hooks";

import type { BoxProps } from "./box";
import type { FloaterProps } from "./floater";
import { Box } from "./box";
import { Floater } from "./floater";

export interface TooltipProps extends BoxProps {
    title?: React.ReactNode;
    placement?: FloaterProps["placement"];
    mouseEnterDelay?: number;
    mouseLeaveDelay?: number;
    onOpen?: () => void;
    onClose?: () => void;
    children?: React.ReactNode;
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
    (
        {
            title,
            placement = "top",
            mouseEnterDelay = 100,
            mouseLeaveDelay = 100,
            onOpen,
            onClose,
            children,
            ...rest
        },
        ref
    ) => {
        const { isOpen, open, close, clearDelayTimer } = useDisclosure({ onOpen, onClose });

        const openWithDelay = () => open({ delay: mouseEnterDelay });
        const closeWithDelay = () => close({ delay: mouseLeaveDelay });

        const [anchorNode, setAnchorNode] = useState<HTMLElement>();
        const child = Children.only(children);
        const childProps = { ref: useForkRef((child as any).ref, setAnchorNode) };
        const anchor = isValidElement(child) ? cloneElement(child, childProps) : child;

        useEventListener("mouseenter", openWithDelay, anchorNode);
        useEventListener("mouseleave", closeWithDelay, anchorNode);
        useEventListener("focus", openWithDelay, anchorNode);
        useEventListener("blur", closeWithDelay, anchorNode);

        return (
            <>
                {anchor}
                <Floater anchor={anchorNode} isOpen={isOpen} placement={placement}>
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
                </Floater>
            </>
        );
    }
);

if (process.env.NODE_ENV !== "production") {
    Tooltip.displayName = "Tooltip";
}
