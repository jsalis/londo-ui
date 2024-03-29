import type * as CSS from "csstype";
import type {
    FontSizeProps,
    SpaceProps,
    LayoutProps,
    ColorProps,
    ResponsiveValue,
} from "styled-system";
import { forwardRef } from "react";
import { system, fontSize, space, layout, color } from "styled-system";
import styled from "styled-components";

export interface IconProps extends FontSizeProps, SpaceProps, LayoutProps, ColorProps {
    as?: keyof JSX.IntrinsicElements;
    viewBox?: string;
    fill?: string;
    stroke?: string;
    transform?: ResponsiveValue<CSS.Property.Transform>;
    cursor?: ResponsiveValue<CSS.Property.Cursor>;
    onClick?: React.MouseEventHandler;
    children?: React.ReactNode;
}

const other = system({
    transform: true,
    cursor: true,
});

export const StyledIcon = styled.svg.withConfig({
    shouldForwardProp: (prop) => prop !== "transform",
})<IconProps>`
    display: inline-block;
    user-select: none;
    flex-shrink: 0;
    ${fontSize}
    ${space}
    ${layout}
    ${color}
    ${other}
`;

export const Icon = forwardRef<HTMLElement, IconProps>(({ color, ...rest }, ref) => (
    <StyledIcon ref={ref} {...rest} color={color as any} />
));

if (process.env.NODE_ENV !== "production") {
    Icon.displayName = "Icon";
}

Icon.defaultProps = {
    size: "1em",
    viewBox: "0 0 24 24",
    color: "currentColor",
    fill: "currentColor",
};
