import { forwardRef } from "react";

import { useDisclosure, useCallbackRef } from "../hooks";
import { WarningIcon } from "../icons";

import type { PopoverProps } from "./popover";
import type { ButtonProps } from "./button";
import { Popover } from "./popover";
import { FocusLock } from "./focus-lock";
import { Flex } from "./flex";
import { Box } from "./box";
import { Button } from "./button";

export interface PopconfirmProps extends PopoverProps {
    title: React.ReactNode;
    disabled?: boolean;
    onConfirm?: (e?: React.MouseEvent) => void;
    onCancel?: (e?: React.MouseEvent) => void;
    okVariant?: ButtonProps["variant"];
    okText?: React.ReactNode;
    cancelText?: React.ReactNode;
    icon?: React.ReactNode;
    autoFocus?: boolean;
    restoreFocus?: boolean;
    initialFocusRef?: React.RefObject<any>;
    finalFocusRef?: React.RefObject<any>;
}

export const Popconfirm = forwardRef<HTMLDivElement, PopconfirmProps>(
    (
        {
            title,
            disabled = false,
            trigger = "click",
            onConfirm,
            onCancel,
            okVariant = "primary",
            okText = "Ok",
            cancelText = "Cancel",
            icon,
            isOpen: isOpenProp,
            defaultIsOpen,
            onOpen,
            onClose,
            autoFocus = true,
            restoreFocus = true,
            initialFocusRef,
            finalFocusRef,
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
            } else {
                onConfirm?.();
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

        const onActivation = useCallbackRef(() => {
            initialFocusRef?.current?.focus();
        });

        const onDeactivation = useCallbackRef(() => {
            finalFocusRef?.current?.focus();
        });

        const content = (
            <FocusLock
                autoFocus={autoFocus}
                returnFocus={restoreFocus}
                onActivation={onActivation}
                onDeactivation={onDeactivation}
            >
                <Flex gap={2} pb={2} alignItems="flex-start">
                    <Box flex="none">
                        {icon ?? <WarningIcon size={18} display="block" color="warning.base" />}
                    </Box>
                    <Box lineHeight="base" color="heading">
                        {title}
                    </Box>
                </Flex>
                <Flex gap={2} justifyContent="flex-end">
                    <Button size="sm" onClick={handleCancel}>
                        {cancelText}
                    </Button>
                    <Button size="sm" variant={okVariant} onClick={handleConfirm}>
                        {okText}
                    </Button>
                </Flex>
            </FocusLock>
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
