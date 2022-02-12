import { Children, isValidElement, cloneElement, forwardRef, useState } from "react";

import { useDisclosure, useForkRef, useEventListener } from "../hooks";

import type { BoxProps } from "./box";
import type { FloaterProps } from "./floater";
import { Box } from "./box";
import { Floater } from "./floater";

export interface PopoverProps extends BoxProps {
    title?: React.ReactNode;
    content?: React.ReactNode;
    placement?: FloaterProps["placement"];
    mouseEnterDelay?: number;
    mouseLeaveDelay?: number;
    onOpen?: () => void;
    onClose?: () => void;
    children?: React.ReactNode;
}

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
    (
        {
            title,
            content,
            placement = "top",
            mouseEnterDelay = 100,
            mouseLeaveDelay = 100,
            onOpen,
            onClose,
            color,
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

        return (
            <>
                {anchor}
                <Floater anchor={anchorNode} isOpen={isOpen} placement={placement} keepMounted>
                    <Box
                        ref={ref}
                        maxWidth={400}
                        borderRadius="base"
                        boxShadow="base"
                        bg="popover.bg"
                        onMouseEnter={clearDelayTimer}
                        onMouseLeave={closeWithDelay}
                        color={color as any}
                        {...rest}
                    >
                        {title ? (
                            <Box p={2} borderBottom="split" color="heading">
                                {title}
                            </Box>
                        ) : null}
                        <Box p={2}>{content}</Box>
                    </Box>
                </Floater>
            </>
        );
    }
);

if (process.env.NODE_ENV !== "production") {
    Popover.displayName = "Popover";
}
