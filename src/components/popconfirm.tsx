import { Children, isValidElement, cloneElement, forwardRef, useState } from "react";

import { useDisclosure, useForkRef, useEventListener } from "../hooks";
import { WarningIcon } from "../icons";
import { KeyCode } from "../utils/key-code";

import type { BoxProps } from "./box";
import type { FloaterProps } from "./floater";
import { Flex } from "./flex";
import { Box } from "./box";
import { Button } from "./button";
import { Floater } from "./floater";
import { ClickAwayListener } from "./click-away-listener";

export interface PopconfirmProps extends BoxProps {
    title?: React.ReactNode;
    placement?: FloaterProps["placement"];
    disabled?: boolean;
    cancelText?: React.ReactNode;
    okText?: React.ReactNode;
    onConfirm?: () => void;
    onCancel?: () => void;
    onOpen?: () => void;
    onClose?: () => void;
    children?: React.ReactNode;
}

export const Popconfirm = forwardRef<HTMLDivElement, PopconfirmProps>(
    (
        {
            title = "Are you sure?",
            placement = "top",
            disabled,
            cancelText = "Cancel",
            okText = "Ok",
            onConfirm,
            onCancel,
            onOpen,
            onClose,
            color,
            children,
            ...rest
        },
        ref
    ) => {
        const { isOpen, close, toggle } = useDisclosure({ onOpen, onClose });

        const handleCancel = () => {
            close();
            onCancel?.();
        };

        const handleConfirm = () => {
            close();
            onConfirm?.();
        };

        const handleToggle = () => {
            if (!disabled) {
                toggle();
            }
        };

        const handleKeyDown = (event: Event) => {
            if ((event as KeyboardEvent).key === KeyCode.ESC && isOpen) {
                close();
            }
        };

        const [anchorNode, setAnchorNode] = useState<HTMLElement>();
        const child = Children.only(children);
        const childProps = { ref: useForkRef((child as any).ref, setAnchorNode) };
        const anchor = isValidElement(child) ? cloneElement(child, childProps) : child;

        useEventListener("click", handleToggle, anchorNode);
        useEventListener("keydown", handleKeyDown, anchorNode);

        return (
            <ClickAwayListener onClickAway={() => close()}>
                <div>
                    {anchor}
                    <Floater anchor={anchorNode} isOpen={isOpen} placement={placement} keepMounted>
                        <Box
                            ref={ref}
                            p={3}
                            maxWidth={400}
                            borderRadius="base"
                            boxShadow="base"
                            bg="popover.bg"
                            color={color as any}
                            {...rest}
                        >
                            <Flex pb={2} align="flex-start">
                                <Box mr={2} flex="none">
                                    <WarningIcon size={18} display="block" color="warning.base" />
                                </Box>
                                <Box lineHeight="base" color="heading">
                                    {title}
                                </Box>
                            </Flex>
                            <Flex justify="flex-end" gap={2}>
                                <Button onClick={handleCancel}>{cancelText}</Button>
                                <Button onClick={handleConfirm}>{okText}</Button>
                            </Flex>
                        </Box>
                    </Floater>
                </div>
            </ClickAwayListener>
        );
    }
);

if (process.env.NODE_ENV !== "production") {
    Popconfirm.displayName = "Popconfirm";
}
