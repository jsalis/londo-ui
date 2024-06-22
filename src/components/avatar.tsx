import type { MarginProps, ColorProps } from "styled-system";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { forwardRef, createContext, useContext, useMemo } from "react";
import { margin, color } from "styled-system";
import styled, { css } from "styled-components";

import type { FlexProps } from "./flex";
import { Flex } from "./flex";

type AvatarPrimitiveProps = React.ComponentProps<typeof AvatarPrimitive.Root>;
type AvatarImageProps = React.ComponentProps<typeof AvatarPrimitive.Image>;

interface AvatarGroupContextValue {
    size?: number;
    shape?: "circle" | "square";
    pixelated?: boolean;
}

export interface AvatarProps
    extends Omit<AvatarPrimitiveProps, "color">,
        AvatarGroupContextValue,
        MarginProps,
        ColorProps {
    src?: string;
    alt?: string;
    fallback?: React.ReactNode;
    delayMs?: number;
    onLoadingStatusChange?: AvatarImageProps["onLoadingStatusChange"];
}

export interface AvatarGroupProps
    extends Omit<FlexProps, "size" | "color">,
        AvatarGroupContextValue {
    space?: number;
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
    font-size: 16px;
    font-weight: 500;
    border-radius: ${(p) => (p.shape === "square" ? `${p.theme.radii.base}px` : "50%")};
    background: ${(p) => p.theme.colors.gray[5]};
    color: #fff;
    ${margin}
    ${color}

    ${(p) => getSizeStyle(p.size ?? 32)}

    ${(p) =>
        p.pixelated &&
        css`
            image-rendering: pixelated;
            image-rendering: crisp-edges;
        `}
`;

const AvatarGroupRoot = styled(Flex)<AvatarGroupProps>`
    display: inline-flex;

    > :not(:first-child) {
        margin-left: ${(p) => p.space}px;
    }

    ${AvatarRoot} {
        border: 1px solid ${(p) => p.theme.colors.bg.base};
    }
`;

const AvatarGroupContext = createContext<AvatarGroupContextValue | undefined>(undefined);

const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
    ({ size, shape, pixelated, space = -6, children, ...rest }, ref) => {
        const group = useMemo(() => ({ size, shape, pixelated }), [size, shape, pixelated]);

        return (
            <AvatarGroupContext.Provider value={group}>
                <AvatarGroupRoot ref={ref} {...rest} space={space} role="group">
                    {children}
                </AvatarGroupRoot>
            </AvatarGroupContext.Provider>
        );
    },
);

const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
    (
        {
            src,
            alt,
            size,
            shape = "square",
            pixelated,
            color,
            delayMs = 100,
            onLoadingStatusChange,
            fallback,
            ...rest
        },
        ref,
    ) => {
        const group = useContext(AvatarGroupContext);

        return (
            <AvatarRoot
                ref={ref}
                {...rest}
                size={group?.size ?? size}
                shape={group?.shape ?? shape}
                pixelated={group?.pixelated ?? pixelated}
                color={color as any}
            >
                <AvatarImage src={src} alt={alt} onLoadingStatusChange={onLoadingStatusChange} />
                <AvatarFallback delayMs={delayMs}>{fallback}</AvatarFallback>
            </AvatarRoot>
        );
    },
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
