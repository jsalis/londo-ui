import { forwardRef, useState } from "react";
import styled, { css } from "styled-components";

import type { FlexProps } from "./flex";
import { Flex } from "./flex";
import { Box } from "./box";
import { VisuallyHidden } from "./visually-hidden";
import { CloseIcon, InfoIcon, CheckIcon, ErrorIcon, WarningIcon } from "../icons";

export interface AlertProps extends FlexProps {
    type?: "info" | "success" | "error" | "warning";
    message?: React.ReactNode;
    icon?: React.ReactNode;
    banner?: boolean;
    closable?: boolean;
    onClose?: (event: React.MouseEvent) => void;
}

const PrefixIcon = styled.div`
    display: inline-flex;
    flex-shrink: 0;
    font-size: 24px;
`;

const CloseButton = styled.button`
    width: 24px;
    height: 24px;
    font-size: 24px;
    padding: 0;
    display: flex;
    align-self: flex-start;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    background-color: transparent;
    border-radius: ${(p) => p.theme.radii.base}px;
    border: none;
    transition: box-shadow 0.2s, background 0.2s;
    outline: 0;
    cursor: pointer;

    &:active,
    &:focus {
        box-shadow: 0 0 0 2px ${(p) => p.theme.colors.primary[2]};
    }
`;

const makeTypeColor = (type: string, color: string) => (p: any) =>
    p.type === type &&
    css`
        background-color: ${p.theme.colors[color][0]};
        border: 2px solid ${p.theme.colors[color][2]};

        ${PrefixIcon} {
            color: ${p.theme.colors[color].base};
        }

        &,
        ${CloseButton} svg {
            color: ${p.theme.colors[color][7]};
        }

        ${CloseButton}:hover {
            background-color: ${p.theme.colors[color][1]};
        }
    `;

const StyledAlert = styled(Flex)<AlertProps>`
    position: relative;
    align-items: center;
    padding: ${(p) => p.theme.space.sm}px;
    gap: ${(p) => p.theme.space.sm}px;
    border-radius: ${(p) => p.theme.radii.base}px;
    font-size: ${(p) => p.theme.fontSizes.md}px;
    line-height: ${(p) => p.theme.lineHeights.base};
    color: ${(p) => p.theme.colors.heading};

    ${makeTypeColor("info", "info")}
    ${makeTypeColor("success", "success")}
    ${makeTypeColor("error", "danger")}
    ${makeTypeColor("warning", "warning")}

    ${(p) =>
        p.banner &&
        css`
            border: 0;
            border-radius: 0;
        `}
`;

const iconMap = {
    info: <InfoIcon />,
    success: <CheckIcon />,
    error: <ErrorIcon />,
    warning: <WarningIcon />,
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
    (
        { type = "info", message, banner = false, icon, closable = false, onClose, color, ...rest },
        ref
    ) => {
        const [closed, setClosed] = useState(false);
        const iconNode = icon ?? iconMap[type];

        const handleClose = (event: React.MouseEvent) => {
            event.preventDefault();
            setClosed(true);
            onClose?.(event);
        };

        if (closed) {
            return null;
        }

        return (
            <StyledAlert
                ref={ref}
                {...rest}
                type={type}
                banner={banner}
                closable={closable}
                color={color as any}
                role="alert"
            >
                {iconNode ? <PrefixIcon>{iconNode}</PrefixIcon> : null}
                <Box flexGrow={1}>{message}</Box>
                {closable ? (
                    <CloseButton type="button" onClick={handleClose}>
                        <VisuallyHidden>Close</VisuallyHidden>
                        <CloseIcon aria-hidden />
                    </CloseButton>
                ) : null}
            </StyledAlert>
        );
    }
);

if (process.env.NODE_ENV !== "production") {
    Alert.displayName = "Alert";
}
