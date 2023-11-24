import type { MarginProps, ColorProps } from "styled-system";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { forwardRef } from "react";
import { margin, color } from "styled-system";
import styled, { css } from "styled-components";

import { isNumber } from "../utils/type-util";

import { Flex } from "./flex";

type AvatarPrimitiveProps = React.ComponentProps<typeof AvatarPrimitive.Root>;
type AvatarImageProps = React.ComponentProps<typeof AvatarPrimitive.Image>;

export interface AvatarProps extends Omit<AvatarPrimitiveProps, "color">, MarginProps, ColorProps {
    src?: string;
    alt?: string;
    fallback?: React.ReactNode;
    delayMs?: number;
    onLoadingStatusChange?: AvatarImageProps["onLoadingStatusChange"];
    size?: "sm" | "md" | "lg" | number;
    shape?: "circle" | "square";
    pixelated?: boolean;
}

function getSizeStyle(size: number) {
    return css`
        width: ${size}px;
        height: ${size}px;
        min-width: ${size}px;
        min-height: ${size}px;
        line-height: ${size}px;
        font-size: ${size / 2}px;
    `;
}

const AvatarRoot = styled(AvatarPrimitive.Root)<AvatarProps>`
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    white-space: nowrap;
    text-align: center;
    overflow: hidden;
    user-select: none;
    width: 32px;
    height: 32px;
    font-size: 16px;
    font-weight: 500;
    border-radius: ${(p) => (p.shape === "square" ? `${p.theme.radii.base}px` : "50%")};
    background: ${(p) => p.theme.colors.gray[5]};
    color: #fff;
    ${margin}
    ${color}

    ${(p) => p.size === "sm" && getSizeStyle(24)}
    ${(p) => p.size === "lg" && getSizeStyle(40)}
    ${(p) => isNumber(p.size) && getSizeStyle(p.size)}

    ${(p) =>
        p.pixelated &&
        css`
            image-rendering: pixelated;
            image-rendering: crisp-edges;
        `}
`;

const AvatarImage = styled(AvatarPrimitive.Image)`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: inherit;
    background: transparent;
`;

const AvatarFallback = styled(AvatarPrimitive.Fallback)`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
`;

const AvatarGroup = styled(Flex)`
    display: inline-flex;

    ${AvatarRoot} {
        border: 1px solid ${(p) => p.theme.colors.bg.base};

        &:not(:first-child) {
            margin-left: -8px;
        }
    }
`;

const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
    (
        {
            src,
            alt,
            delayMs,
            size = "md",
            shape = "circle",
            color,
            onLoadingStatusChange,
            fallback,
            ...rest
        },
        ref
    ) => {
        return (
            <AvatarRoot ref={ref} {...rest} size={size} shape={shape} color={color as any}>
                <AvatarImage src={src} alt={alt} onLoadingStatusChange={onLoadingStatusChange} />
                <AvatarFallback delayMs={delayMs}>{fallback}</AvatarFallback>
            </AvatarRoot>
        );
    }
);

const CompoundAvatar = Object.assign(Avatar, {
    id: "Avatar",
    Group: AvatarGroup,
});

export { CompoundAvatar as Avatar };

if (process.env.NODE_ENV !== "production") {
    Avatar.displayName = "Avatar";
    AvatarGroup.displayName = "AvatarGroup";
}
