import type * as CSS from "csstype";
import type { ResponsiveValue } from "styled-system";
import { system } from "styled-system";
import styled from "styled-components";

import { isNumber } from "../utils/type-util";

import type { BoxProps } from "./box";
import { Box } from "./box";

export interface GridProps extends BoxProps {
    flow?: ResponsiveValue<CSS.Property.GridAutoFlow>;
    columns?: ResponsiveValue<CSS.Property.GridTemplateColumns | number>;
    rows?: ResponsiveValue<CSS.Property.GridTemplateRows | number>;
    autoColumns?: ResponsiveValue<CSS.Property.GridAutoColumns>;
    autoRows?: ResponsiveValue<CSS.Property.GridAutoRows>;
    areas?: ResponsiveValue<CSS.Property.GridTemplateAreas>;
}

function makeUnits(val: string | number) {
    return isNumber(val) ? `repeat(${val}, 1fr)` : val;
}

const grid = system({
    flow: {
        property: "gridAutoFlow",
    },
    columns: {
        property: "gridTemplateColumns",
        transform: makeUnits,
    },
    rows: {
        property: "gridTemplateRows",
        transform: makeUnits,
    },
    autoColumns: {
        property: "gridAutoColumns",
    },
    autoRows: {
        property: "gridAutoRows",
    },
    areas: {
        property: "gridTemplateAreas",
    },
});

export const Grid = styled(Box)<GridProps>`
    display: grid;
    ${grid}
`;

if (process.env.NODE_ENV !== "production") {
    Grid.displayName = "Grid";
}

Grid.defaultProps = {
    height: "auto",
    flow: "row",
};
