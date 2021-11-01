import styled from "styled-components";
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

const other = system({
    whiteSpace: true,
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

export const Box = styled.div`
    box-sizing: border-box;
    min-width: 0;
    ${space}
    ${layout}
    ${position}
    ${flexbox}
    ${color}
    ${border}
    ${shadow}
    ${typography}
    ${grid}
    ${other}
  
    &[hidden] {
        display: none !important;
    }
`;
