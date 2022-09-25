import type * as CSS from "csstype";
import type {
    TypographyProps,
    SpaceProps,
    LayoutProps,
    PositionProps,
    FlexboxProps,
    ColorProps,
    BorderProps,
    ShadowProps,
    ResponsiveValue,
} from "styled-system";
import {
    system,
    space,
    layout,
    position,
    flexbox,
    color,
    border,
    shadow,
    typography,
} from "styled-system";
import styled from "styled-components";

export interface BoxProps
    extends TypographyProps,
        SpaceProps,
        LayoutProps,
        PositionProps,
        FlexboxProps,
        ColorProps,
        BorderProps,
        ShadowProps {
    as?: keyof JSX.IntrinsicElements;
    area?: ResponsiveValue<CSS.Property.GridArea>;
    columnStart?: ResponsiveValue<CSS.Property.GridColumnStart | number>;
    columnEnd?: ResponsiveValue<CSS.Property.GridColumnEnd | number>;
    columnSpan?: ResponsiveValue<number>;
    rowStart?: ResponsiveValue<CSS.Property.GridRowStart | number>;
    rowEnd?: ResponsiveValue<CSS.Property.GridRowEnd | number>;
    rowSpan?: ResponsiveValue<number>;
    gap?: ResponsiveValue<CSS.Property.Gap | number>;
    columnGap?: ResponsiveValue<CSS.Property.ColumnGap | number>;
    rowGap?: ResponsiveValue<CSS.Property.RowGap | number>;
    whiteSpace?: ResponsiveValue<CSS.Property.WhiteSpace>;
    pointerEvents?: ResponsiveValue<CSS.Property.PointerEvents>;
    userSelect?: ResponsiveValue<CSS.Property.UserSelect>;
    cursor?: ResponsiveValue<CSS.Property.Cursor>;
    className?: string;
    children?: React.ReactNode;
}

const other = system({
    whiteSpace: true,
    textTransform: true,
    pointerEvents: true,
    userSelect: true,
    cursor: true,
});

const grid = system({
    area: {
        property: "gridArea",
    },
    columnStart: {
        property: "gridColumnStart",
    },
    columnEnd: {
        property: "gridColumnEnd",
    },
    columnSpan: {
        property: "gridColumnEnd",
        transform: (val) => `span ${val}`,
    },
    rowStart: {
        property: "gridRowStart",
    },
    rowEnd: {
        property: "gridRowEnd",
    },
    rowSpan: {
        property: "gridRowEnd",
        transform: (val) => `span ${val}`,
    },
    gap: {
        property: "gap",
        scale: "space",
    },
    columnGap: {
        property: "columnGap",
        scale: "space",
    },
    rowGap: {
        property: "rowGap",
        scale: "space",
    },
});

export const Box = styled.div<BoxProps>`
    box-sizing: border-box;
    min-width: 0;
    ${typography}
    ${space}
    ${layout}
    ${position}
    ${flexbox}
    ${color}
    ${border}
    ${shadow}
    ${grid}
    ${other}
  
    &[hidden] {
        display: none !important;
    }
`;

if (process.env.NODE_ENV !== "production") {
    Box.displayName = "Box";
}
