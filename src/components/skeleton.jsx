import { forwardRef } from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import { space, layout, border } from "styled-system";

const baseColor = (p) => p.theme.colors.gray[3];
const highlightColor = (p) => p.theme.colors.gray[1];

const skeletonKeyframes = keyframes`
    0% {
        background-position: -200px 0;
    }
    100% {
        background-position: calc(200px + 100%) 0;
    }
`;

const Bar = styled.span`
    animation: ${skeletonKeyframes} ${(p) => p.duration}s ease-in-out infinite;
    background-color: ${baseColor};
    background-image: linear-gradient(90deg, ${baseColor}, ${highlightColor}, ${baseColor});
    background-size: 200px 100%;
    background-repeat: no-repeat;
    display: inline-block;
    line-height: 1;
    width: 100%;
    ${space}
    ${layout}
    ${border}
`;

export const Skeleton = forwardRef(({ count, duration, circle, ...rest }, ref) => {
    const elements = [];
    const hasSize = rest.size || rest.width || rest.height;
    const borderRadius = circle && hasSize ? "50%" : "base";

    for (let i = 0; i < count; i++) {
        elements.push(
            <Bar {...rest} key={i} duration={duration} borderRadius={borderRadius}>
                &zwnj;
            </Bar>
        );
    }

    return <span ref={ref}>{elements}</span>;
});

if (process.env.NODE_ENV !== "production") {
    Skeleton.propTypes = {
        count: PropTypes.number,
        duration: PropTypes.number,
        circle: PropTypes.bool,
        className: PropTypes.string,
    };
}

Skeleton.defaultProps = {
    count: 1,
    duration: 1.2,
    circle: false,
};
