import { forwardRef, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { color } from "styled-system";

import { Box } from "./box";

const BAR_MIN_SIZE = 32;
const BAR_MARGIN = 8;

const VerticalBar = styled.div`
    width: 4px;
    position: absolute;
    top: 0;
    right: 0;
    transition: opacity 0.2s;
    opacity: 0;
    ${color}
`;

const HorizontalBar = styled.div`
    height: 4px;
    position: absolute;
    bottom: 0;
    left: 0;
    transition: opacity 0.2s;
    opacity: 0;
    ${color}
`;

const ScrollContent = styled.div`
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

export const Scroller = forwardRef(({ barColor, overScroll, children, ...rest }, ref) => {
    const { content, yBar, xBar } = useScroll({ children });
    return (
        <Container ref={ref} {...rest}>
            <ScrollContent ref={content} overScroll={overScroll}>
                {children}
            </ScrollContent>
            <VerticalBar ref={yBar} bg={barColor} />
            <HorizontalBar ref={xBar} bg={barColor} />
        </Container>
    );
});

function useScroll({ children }) {
    const content = useRef();
    const yBar = useRef();
    const xBar = useRef();

    useEffect(() => {
        const update = () => updateScroll(content.current, yBar.current, xBar.current);
        content.current.addEventListener("scroll", update);
        window.addEventListener("resize", update);
        update();

        return () => {
            content.current?.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
        };
    }, [children]);

    return { content, yBar, xBar };
}

function updateScroll(content, yBar, xBar) {
    const {
        scrollTop = 0,
        scrollHeight = 0,
        clientHeight = 0,
        scrollLeft = 0,
        scrollWidth = 0,
        clientWidth = 0,
    } = content;

    const yBarHeight = getVerticalBarHeight(content);
    const yTrackHeight =
        scrollWidth === clientWidth ? clientHeight : clientHeight - BAR_MARGIN;
    const yBarOffset =
        (scrollTop / (scrollHeight - clientHeight)) * (yTrackHeight - yBarHeight);

    const xBarWidth = getHorizontalBarWidth(content);
    const xTrackWidth =
        scrollHeight === clientHeight ? clientWidth : clientWidth - BAR_MARGIN;
    const xBarOffset =
        (scrollLeft / (scrollWidth - clientWidth)) * (xTrackWidth - xBarWidth);

    if (yBar) {
        yBar.style.height = `${yBarHeight}px`;
        yBar.style.transform = `translateY(${yBarOffset}px)`;
    }

    if (xBar) {
        xBar.style.width = `${xBarWidth}px`;
        xBar.style.transform = `translateX(${xBarOffset}px)`;
    }
}

function getVerticalBarHeight(content) {
    const { scrollHeight = 0, clientHeight = 0 } = content;
    const height = Math.ceil((clientHeight / scrollHeight) * clientHeight);
    return height === clientHeight ? 0 : Math.max(height, BAR_MIN_SIZE);
}

function getHorizontalBarWidth(content) {
    const { scrollWidth = 0, clientWidth = 0 } = content;
    const width = Math.ceil((clientWidth / scrollWidth) * clientWidth);
    return width === clientWidth ? 0 : Math.max(width, BAR_MIN_SIZE);
}

Scroller.propTypes = {
    barColor: PropTypes.string,
    overScroll: PropTypes.oneOf(["auto", "contain", "none"]),
    className: PropTypes.string,
    children: PropTypes.node,
};

Scroller.defaultProps = {
    barColor: "alpha.3",
    overScroll: "auto",
};
