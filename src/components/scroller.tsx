import type * as CSS from "csstype";
import type { ColorProps, ResponsiveValue } from "styled-system";
import { forwardRef, useRef, useEffect } from "react";
import { color } from "styled-system";
import styled from "styled-components";

import type { BoxProps } from "./box";
import { Box } from "./box";

const BAR_MIN_SIZE = 32;
const BAR_MARGIN = 8;

interface BarProps extends ColorProps {}

export interface ScrollerProps extends BoxProps {
    barColor?: ResponsiveValue<CSS.Property.BackgroundColor>;
    overScroll?: CSS.Property.OverscrollBehavior;
}

const VerticalBar = styled.div<BarProps>`
    width: 4px;
    position: absolute;
    top: 0;
    right: 0;
    transition: opacity 0.2s;
    opacity: 0;
    ${color}
`;

const HorizontalBar = styled.div<BarProps>`
    height: 4px;
    position: absolute;
    bottom: 0;
    left: 0;
    transition: opacity 0.2s;
    opacity: 0;
    ${color}
`;

const ScrollContent = styled(Box)<ScrollerProps>`
    height: 100%;
    overflow: scroll;
    overscroll-behavior: ${(p) => p.overScroll};
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const Container = styled(Box)`
    position: relative;
    overflow: hidden;

    &:hover {
        ${VerticalBar}, ${HorizontalBar} {
            opacity: 1;
        }
    }
`;

function useScroll(children: React.ReactNode) {
    const content = useRef<HTMLDivElement>(null);
    const yBar = useRef<HTMLDivElement>(null);
    const xBar = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const update = () => {
            if (content.current && yBar.current && xBar.current) {
                updateScroll(content.current, yBar.current, xBar.current);
            }
        };

        content.current?.addEventListener("scroll", update);
        window.addEventListener("resize", update);
        update();

        return () => {
            content.current?.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
        };
    }, [children]);

    return { content, yBar, xBar };
}

function updateScroll(content: HTMLElement, yBar: HTMLElement, xBar: HTMLElement) {
    const {
        scrollTop = 0,
        scrollHeight = 0,
        clientHeight = 0,
        scrollLeft = 0,
        scrollWidth = 0,
        clientWidth = 0,
    } = content;

    const yBarHeight = getVerticalBarHeight(content);
    const yTrackHeight = scrollWidth === clientWidth ? clientHeight : clientHeight - BAR_MARGIN;
    const yBarOffset = (scrollTop / (scrollHeight - clientHeight)) * (yTrackHeight - yBarHeight);

    const xBarWidth = getHorizontalBarWidth(content);
    const xTrackWidth = scrollHeight === clientHeight ? clientWidth : clientWidth - BAR_MARGIN;
    const xBarOffset = (scrollLeft / (scrollWidth - clientWidth)) * (xTrackWidth - xBarWidth);

    if (yBar) {
        yBar.style.height = `${yBarHeight}px`;
        yBar.style.transform = `translateY(${yBarOffset}px)`;
    }

    if (xBar) {
        xBar.style.width = `${xBarWidth}px`;
        xBar.style.transform = `translateX(${xBarOffset}px)`;
    }
}

function getVerticalBarHeight(content: HTMLElement) {
    const { scrollHeight = 0, clientHeight = 0 } = content;
    const height = Math.ceil((clientHeight / scrollHeight) * clientHeight);
    return height === clientHeight ? 0 : Math.max(height, BAR_MIN_SIZE);
}

function getHorizontalBarWidth(content: HTMLElement) {
    const { scrollWidth = 0, clientWidth = 0 } = content;
    const width = Math.ceil((clientWidth / scrollWidth) * clientWidth);
    return width === clientWidth ? 0 : Math.max(width, BAR_MIN_SIZE);
}

export const Scroller = forwardRef<HTMLDivElement, ScrollerProps>(
    ({ barColor = "alpha.5", overScroll = "auto", maxHeight, color, children, ...rest }, ref) => {
        const { content, yBar, xBar } = useScroll(children);
        return (
            <Container ref={ref} maxHeight={maxHeight} {...rest} color={color as any}>
                <ScrollContent ref={content} maxHeight={maxHeight} overScroll={overScroll}>
                    {children}
                </ScrollContent>
                <VerticalBar ref={yBar} bg={barColor} />
                <HorizontalBar ref={xBar} bg={barColor} />
            </Container>
        );
    }
);

if (process.env.NODE_ENV !== "production") {
    Scroller.displayName = "Scroller";
}
