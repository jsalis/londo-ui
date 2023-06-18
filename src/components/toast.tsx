import * as ToastPrimitive from "@radix-ui/react-toast";
import { createContext, useState, useMemo, useEffect, useContext } from "react";
import styled, { css, keyframes } from "styled-components";
import { nanoid } from "nanoid";

import { Box } from "./box";
import { Portal } from "./portal";
import { IconButton } from "./icon-button";
import { CloseIcon, InfoIcon, CheckIcon, ErrorIcon, WarningIcon } from "../icons";
import { useCallbackRef } from "../hooks";
import { omit } from "../utils/object-util";

export interface ToastProviderProps {
    container?: HTMLElement | (() => HTMLElement);
    children?: React.ReactNode;
}

interface ToastProps {
    key?: string;
    title: React.ReactNode;
    description?: React.ReactNode;
    icon?: React.ReactNode;
    action?: React.ReactNode;
    actionAltText?: string;
    duration?: number;
    type?: "info" | "success" | "error" | "warning";
    sensitivity?: "foreground" | "background";
    onClose?: () => void;
}

interface ToastIconProps {
    type?: ToastProps["type"];
}

interface ToastController {
    open: (props: ToastProps) => string;
    close: (key: string) => void;
    info: (props: ToastProps) => string;
    success: (props: ToastProps) => string;
    error: (props: ToastProps) => string;
    warning: (props: ToastProps) => string;
}

const ToastContext = createContext<ToastController>(null as any);

export function useToast() {
    return useContext(ToastContext);
}

const hide = keyframes`
    from {
        margin-bottom: 0;
        opacity: 1;
    }
    to {
        margin-bottom: -16px;
        opacity: 0;
    }
`;

const slideIn = keyframes`
    from {
        transform: translateX(calc(100% + var(--viewport-padding)));
    }
    to {
        transform: translateX(0);
    }
`;

const swipeOut = keyframes`
    from {
        transform: translateX(var(--radix-toast-swipe-end-x));
    }
    to {
        transform: translateX(calc(100% + var(--viewport-padding)));
    }
`;

const makeTypeColor = (type: string, color: string) => (p: any) =>
    p.type === type &&
    css`
        color: ${p.theme.colors[color].base};
    `;

const ToastIcon = styled.span<ToastIconProps>`
    display: inline-flex;
    font-size: ${(p) => p.theme.fontSizes[5]}px;

    ${makeTypeColor("info", "info")}
    ${makeTypeColor("success", "success")}
    ${makeTypeColor("error", "danger")}
    ${makeTypeColor("warning", "warning")}
`;

const ToastTitle = styled(ToastPrimitive.Title)`
    color: ${(p) => p.theme.colors.heading};
    font-size: ${(p) => p.theme.fontSizes.lg}px;
`;

const ToastDescription = styled(ToastPrimitive.Description)`
    font-size: ${(p) => p.theme.fontSizes.md}px;
`;

const ToastAction = styled(ToastPrimitive.Action)`
    flex-shrink: 0;
`;

const ToastClose = styled(ToastPrimitive.Close)`
    flex-shrink: 0;
`;

const ToastRoot = styled(ToastPrimitive.Root)`
    display: flex;
    align-items: center;
    column-gap: ${(p) => p.theme.space.md}px;
    padding: ${(p) => p.theme.space.md}px;
    border-radius: ${(p) => p.theme.radii.base}px;
    box-shadow: ${(p) => p.theme.shadows.base};
    background: ${(p) => p.theme.colors.popover.bg};
    line-height: ${(p) => p.theme.lineHeights.base};

    &[data-state="open"] {
        animation: ${slideIn} 150ms ${(p) => p.theme.transitions.easeOut};
    }

    &[data-state="closed"] {
        animation: ${hide} 100ms ${(p) => p.theme.transitions.easeIn};
    }

    &[data-swipe="move"] {
        transform: translateX(var(--radix-toast-swipe-move-x));
    }

    &[data-swipe="cancel"] {
        transform: translateX(0);
        transition: transform 200ms ${(p) => p.theme.transitions.easeOut};
    }

    &[data-swipe="end"] {
        animation: ${swipeOut} 100ms ${(p) => p.theme.transitions.easeOut};
    }
`;

const ToastViewport = styled(ToastPrimitive.Viewport)`
    --viewport-padding: 16px;
    position: fixed;
    bottom: 8px;
    right: 0;
    display: flex;
    flex-direction: column;
    padding: var(--viewport-padding);
    gap: 16px;
    width: 420px;
    max-width: 100vw;
    margin: 0;
    list-style: none;
    z-index: 1010;
    outline: none;
`;

const iconMap = {
    info: <InfoIcon />,
    success: <CheckIcon />,
    error: <ErrorIcon />,
    warning: <WarningIcon />,
};

function Toast({
    title,
    description,
    icon,
    action,
    actionAltText = "Action",
    duration = 4000,
    type,
    sensitivity = "foreground",
    onClose,
}: ToastProps) {
    const [open, setOpen] = useState(true);
    const iconNode = icon ?? (type ? iconMap[type] : null);

    useEffect(() => {
        if (!open) {
            const id = setTimeout(() => onClose?.(), 200);
            return () => clearTimeout(id);
        }
        return;
    }, [open]);

    return (
        <ToastRoot open={open} onOpenChange={setOpen} type={sensitivity} duration={duration}>
            {iconNode ? <ToastIcon type={type}>{iconNode}</ToastIcon> : null}
            <Box flexGrow={1}>
                <ToastTitle>{title}</ToastTitle>
                {description ? <ToastDescription>{description}</ToastDescription> : null}
            </Box>
            {action ? (
                <ToastAction asChild altText={actionAltText}>
                    {action}
                </ToastAction>
            ) : null}
            <ToastClose asChild>
                <IconButton
                    type="button"
                    variant="text"
                    aria-label="Close"
                    icon={<CloseIcon size={24} />}
                />
            </ToastClose>
        </ToastRoot>
    );
}

export function ToastProvider({ container, children }: ToastProviderProps) {
    const [toasts, setToasts] = useState<Record<string, ToastProps>>({});

    const open = useCallbackRef((props) => {
        const key = props.key ?? nanoid();
        setToasts((t) => {
            return { ...t, [key]: { ...t[key], ...props, key } };
        });
        return key;
    });

    const close = useCallbackRef((key) => {
        if (toasts[key]) {
            setToasts((t) => {
                return { ...t, [key]: { ...t[key], duration: 1 } };
            });
        }
    });

    const info = useCallbackRef((props) => {
        return open({ ...props, type: "info" });
    });

    const success = useCallbackRef((props) => {
        return open({ ...props, type: "success" });
    });

    const error = useCallbackRef((props) => {
        return open({ ...props, type: "error" });
    });

    const warning = useCallbackRef((props) => {
        return open({ ...props, type: "warning" });
    });

    const contextValue = useMemo<ToastController>(() => {
        return { open, close, info, success, error, warning };
    }, []);

    const handleClose = useCallbackRef((key) => {
        setToasts((t) => omit(t, [key]));
        toasts[key]?.onClose?.();
    });

    return (
        <ToastContext.Provider value={contextValue}>
            <ToastPrimitive.Provider swipeDirection="right">
                {children}
                {Object.values(toasts).map((props) => (
                    <Toast {...props} onClose={() => handleClose(props.key)} />
                ))}
                <Portal container={container}>
                    <ToastViewport />
                </Portal>
            </ToastPrimitive.Provider>
        </ToastContext.Provider>
    );
}

if (process.env.NODE_ENV !== "production") {
    ToastProvider.displayName = "ToastProvider";
}
