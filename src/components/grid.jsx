import styled from "styled-components";
import { system } from "styled-system";
import PropTypes from "prop-types";

import { isNumber } from "../utils/type-util";

import { Box } from "./box";

function makeUnits(value) {
    return isNumber(value) ? `repeat(${value}, 1fr)` : value;
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

export const Grid = styled(Box)`
    display: grid;
    ${grid}
`;

Grid.propTypes = {
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
    flow: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    columns: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
    rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
    autoColumns: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
    autoRows: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
    areas: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    gap: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
    columnGap: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
    rowGap: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
    className: PropTypes.string,
};

Grid.defaultProps = {
    height: "auto",
    flow: "row",
};
