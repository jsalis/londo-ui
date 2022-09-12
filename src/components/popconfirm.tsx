import { forwardRef } from "react";

import { useDisclosure } from "../hooks";
import { WarningIcon } from "../icons";

import type { PopoverProps } from "./popover";
import { Popover } from "./popover";
import { Flex } from "./flex";
import { Box } from "./box";
import { Button } from "./button";

export interface PopconfirmProps extends PopoverProps {
    title: React.ReactNode;
    disabled?: boolean;
    onConfirm?: (e?: React.MouseEvent) => void;
    onCancel?: (e?: React.MouseEvent) => void;
    okText?: React.ReactNode;
    cancelText?: React.ReactNode;
    icon?: React.ReactNode;
}

export const Popconfirm = forwardRef<HTMLDivElement, PopconfirmProps>(
    (
        {
            title,
            disabled = false,
            trigger = "click",
            onConfirm,
            onCancel,
            okText = "Ok",
            cancelText = "Cancel",
            icon,
            isOpen: isOpenProp,
            defaultIsOpen,
            onOpen,
            onClose,
            children,
            ...rest
        },
        ref
    ) => {
        const { isOpen, open, close } = useDisclosure({
            isOpen: isOpenProp,
            defaultIsOpen,
            onOpen,
            onClose,
        });

        const handleOpen = () => {
            if (!disabled) {
                open();
            }
        };

        const handleClose = () => {
            if (!disabled) {
                close();
            }
        };

        const handleCancel = (event: React.MouseEvent) => {
            close();
            onCancel?.(event);
        };

        const handleConfirm = (event: React.MouseEvent) => {
            close();
            onConfirm?.(event);
        };

        const content = (
            <>
                <Flex gap={2} pb={2} alignItems="flex-start">
                    <Box flex="none">
                        {icon ?? <WarningIcon size={18} display="block" color="warning.base" />}
                    </Box>
                    <Box lineHeight="base" color="heading">
                        {title}
                    </Box>
                </Flex>
                <Flex gap={2} justifyContent="flex-end">
                    <Button onClick={handleCancel}>{cancelText}</Button>
                    <Button onClick={handleConfirm}>{okText}</Button>
                </Flex>
            </>
        );

        return (
            <Popover
                ref={ref}
                p={2}
                {...rest}
                isOpen={isOpen}
                onOpen={handleOpen}
                onClose={handleClose}
                trigger={trigger}
                content={content}
            >
                {children}
            </Popover>
        );
    }
);

if (process.env.NODE_ENV !== "production") {
    Popconfirm.displayName = "Popconfirm";
}
