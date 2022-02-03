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
    cursor?: ResponsiveValue<CSS.Property.Cursor>;
    children?: React.ReactNode;
}

const other = system({
    cursor: true,
});

export const StyledIcon = styled.svg<IconProps>`
    display: inline-block;
    user-select: none;
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
    size: 14,
    viewBox: "0 0 24 24",
    color: "currentColor",
    fill: "currentColor",
};
