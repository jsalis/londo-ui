import styled, { css } from "styled-components";

import type { BoxProps } from "./box";
import { Box } from "./box";

export interface ImageProps
    extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "width" | "height" | "color">,
        BoxProps {
    pixelated?: boolean;
    onLoad?: React.ReactEventHandler<HTMLImageElement>;
    onError?: React.ReactEventHandler<HTMLImageElement>;
}

export const Image = styled(Box)<ImageProps>`
    ${(p) =>
        p.pixelated &&
        css`
            image-rendering: pixelated;
            image-rendering: crisp-edges;
        `}
`;

if (process.env.NODE_ENV !== "production") {
    Image.displayName = "Image";
}

Image.defaultProps = {
    as: "img",
};
