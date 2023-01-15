import type * as CSS from "csstype";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { forwardRef } from "react";
import styled from "styled-components";

import type { BoxProps } from "./box";
import { Box } from "./box";

type ScrollAreaPrimitiveProps = React.ComponentProps<typeof ScrollAreaPrimitive.Root>;

export interface ScrollBoxProps extends BoxProps {
    type?: ScrollAreaPrimitiveProps["type"];
    scrollHideDelay?: ScrollAreaPrimitiveProps["scrollHideDelay"];
    overScroll?: CSS.Property.OverscrollBehavior;
}

const ScrollAreaThumb = styled(ScrollAreaPrimitive.Thumb)`
    flex: 1;
    position: relative;
    background: ${(p) => p.theme.colors.alpha[3]};
    border-radius: var(--scrollbar-size);

    &::before {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
        min-width: 44px;
        min-height: 44px;
        content: "";
    }
`;

const ScrollAreaScrollbar = styled(ScrollAreaPrimitive.Scrollbar)`
    display: flex;
    padding: 2px;
    transition: background 160ms ease-out;
    user-select: none;
    touch-action: none;

    &:hover {
        background: ${(p) => p.theme.colors.alpha[1]};
    }

    &[data-orientation="vertical"] {
        width: var(--scrollbar-size);
    }

    &[data-orientation="horizontal"] {
        flex-direction: column;
        height: var(--scrollbar-size);
    }
`;

const ScrollAreaCorner = styled(ScrollAreaPrimitive.Corner)``;

const ScrollAreaViewport = styled(ScrollAreaPrimitive.Viewport)`
    width: 100%;
    height: 100%;
    max-height: inherit;
    border-radius: inherit;
`;

const ScrollAreaRoot = styled(ScrollAreaPrimitive.Root)<ScrollBoxProps>`
    --scrollbar-size: 8px;
    overflow: hidden;

    ${ScrollAreaViewport} {
        overscroll-behavior: ${(p) => p.overScroll};
    }
`;

export const ScrollBox = forwardRef<HTMLDivElement, ScrollBoxProps>(
    (
        { type = "hover", scrollHideDelay = 600, overScroll = "auto", color, children, ...rest },
        ref
    ) => {
        return (
            <ScrollAreaRoot
                asChild
                type={type}
                scrollHideDelay={scrollHideDelay}
                overScroll={overScroll}
            >
                <Box ref={ref} {...rest} color={color as any}>
                    <ScrollAreaViewport>{children}</ScrollAreaViewport>
                    <ScrollAreaScrollbar orientation="vertical">
                        <ScrollAreaThumb />
                    </ScrollAreaScrollbar>
                    <ScrollAreaScrollbar orientation="horizontal">
                        <ScrollAreaThumb />
                    </ScrollAreaScrollbar>
                    <ScrollAreaCorner />
                </Box>
            </ScrollAreaRoot>
        );
    }
);

if (process.env.NODE_ENV !== "production") {
    ScrollBox.displayName = "ScrollBox";
}
